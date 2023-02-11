from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Result
from datetime import datetime
# Create your tests here.


class RankingTests(APITestCase):
    create_list_url = reverse('result-list')
    date = str(datetime.now)

    example_data = {
        "user_name": "data",
        "correct_answers": 10,
        "seconds": 10, }
    example_data_2 = {
        "user_name": "data_2",
        "correct_answers": 11,
        "seconds": 10, }
    example_data_3 = {
        "user_name": "data_3",
        "correct_answers": 10,
        "seconds": 9, }

    def test_create_question(self):
        """
        Ensure we can create a new result object.
        """
        new_data = self.example_data
        response = self.client.post(self.create_list_url, new_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Result.objects.count(), 1)
        self.assertEqual(Result.objects.get().user_name, "data")
    
    def test_field_not_blank(self):
        """
        Ensure we can capture and avoid blank fields
        """
        new_data = dict(self.example_data)
        for key in new_data:
            new_data[key] = ""
            response = self.client.post(self.create_list_url, new_data, format='json')
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_list_results(self):
        """
        Ensure we can retrieve a list of results.
        """
        new_data = self.example_data
        new_data_2 = self.example_data_2
        new_data_3 = self.example_data_3
        response = self.client.post(self.create_list_url, new_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response_2 = self.client.post(self.create_list_url, new_data_2, format='json')
        self.assertEqual(response_2.status_code, status.HTTP_201_CREATED)
        response_3 = self.client.post(self.create_list_url, new_data_3, format='json')
        self.assertEqual(response_3.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Result.objects.count(), 3)
        response_4 = self.client.get(self.create_list_url)
        self.assertEqual(response_4.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response_4.data['results']), 3)
    
    def test_list_results_in_order(self):
        """
        Ensure we can retrieve a list in the correct order of results.
        """
        new_data = self.example_data
        new_data_2 = self.example_data_2
        new_data_3 = self.example_data_3
        response = self.client.post(self.create_list_url, new_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response_2 = self.client.post(self.create_list_url, new_data_2, format='json')
        self.assertEqual(response_2.status_code, status.HTTP_201_CREATED)
        response_3 = self.client.post(self.create_list_url, new_data_3, format='json')
        self.assertEqual(response_3.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Result.objects.count(), 3)
        response_4 = self.client.get(self.create_list_url)
        self.assertEqual(response_4.status_code, status.HTTP_200_OK)
        self.assertEqual(response_4.data['results'][0]['user_name'], 'data_2')
        self.assertEqual(response_4.data['results'][1]['user_name'], 'data_3')
        self.assertEqual(response_4.data['results'][2]['user_name'], 'data')

