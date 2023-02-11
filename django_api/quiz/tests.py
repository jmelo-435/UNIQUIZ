from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from quiz.models import Question


class QuestionTests(APITestCase):
    url = reverse('questions-list')
    list_url = reverse('random-list', kwargs={"len": "2"})
    example_data = {
        "title": "Qual é a cor do céu?",
        "option_1": "Azul",
        "option_2": "Preto",
        "option_3": "Roxo",
        "option_4": "Transparente",
        "option_5": "Varia",
        "correct_answer": 5}
    example_data_2 = {
        "title": "Qual a raiz quadrada de 9 ?",
        "option_1": "3",
        "option_2": "9/2",
        "option_3": "Essa pergunta não tem resposta",
        "option_4": "Essa pergunta tem mais de uma resposta",
        "option_5": "Não existe",
        "correct_answer": 4
    }

    def test_create_question(self):
        """
        Ensure we can create a new question object.
        """
        new_data = self.example_data
        response = self.client.post(self.url, new_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Question.objects.count(), 1)
        self.assertEqual(Question.objects.get().title, "Qual é a cor do céu?")

    def test_unique_title(self):
        """
        Ensure we can avoid equal titles
        """
        new_data = self.example_data
        response = self.client.post(self.url, new_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Question.objects.count(), 1)
        self.assertEqual(Question.objects.get().title, "Qual é a cor do céu?")
        response = self.client.post(self.url, self.example_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_field_not_blank(self):
        """
        Ensure we can capture and avoid blank fields
        """
        new_data = dict(self.example_data)
        for key in new_data:
            if key == "correct_answer":
                continue

            new_data[key] = ""
            response = self.client.post(self.url, new_data, format='json')
            self.assertEqual(response.data[key], ["This field may not be blank."])

    def test_field_not_null(self):
        """
        Ensure we can capture and avoid blank fields
        """
        new_data = dict(self.example_data)
        for key in new_data:
            if key == "correct_answer":
                continue

            new_data[key] = None
            response = self.client.post(self.url, new_data, format='json')
            self.assertEqual(response.data[key], ["This field may not be null."])

    def test_correct_answer_in_scope(self):
        """
        Ensure we can capture and avoid blank fields
        """
        new_data = dict(self.example_data)

        new_data['correct_answer'] = 6
        response = self.client.post(self.url, new_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_random_list(self):
        """
        Ensure the list lenth of random parameters is correct
        """
        new_data = dict(self.example_data)
        new_data_2 = dict(self.example_data_2)

        response = self.client.post(self.url, new_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response_2 = self.client.post(self.url, new_data_2, format='json')
        self.assertEqual(response_2.status_code, status.HTTP_201_CREATED)
        response_3 = self.client.get(self.list_url)
        self.assertEqual(response_3.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response_3.data), 2)
