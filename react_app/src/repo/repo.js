import {
  DbTestResponseCodes,
  TestResponseCodes,
  GetQuestionsResponseCodes,
} from "./ApiResponseCodes";
import axios from "axios";
import {Question} from  "../domain/Question";

const root = "http://localhost";

const Endpoints = Object.freeze({
  Test: "/api",
  DbTest: "/api/db_test",
  DbTestCreate: "/api/db_test/create",
  GetQuestions:"/api/questions/random/"
});

const Methods = Object.freeze({
  PUT: "PUT",
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
  HEAD: "HEAD",
  PATCH: "PATCH",
});

class ApiRequestParameters {
  constructor(endpoint = Endpoints.Api, data = null, method = Methods.GET) {
    this.endpoint = endpoint;
    this.data = data;
    this.method = method;
  }
}

function extractResponseCode(possibleResponseCodes, res) {
  let code = null;
  for (let [key, value] of Object.entries(possibleResponseCodes)) {
    if (res["code"] === value) {
      code = key;
    }
  }
  return code;
}

async function getApiResponse(parameters) {
  const response = await axios({
    data: parameters.data,
    headers: {},
    method: parameters.method,
    url: root + parameters.endpoint,
    withCredentials: true
  });
  return response.data;
}

export async function testApi() {
  class TestResponse {
    constructor(res) {
      this.responseCode = extractResponseCode(TestResponseCodes, res);
      this.sucess = res.sucess;
      this.message = res.msg;
      return this;
    }
  }

  const params = new ApiRequestParameters(
    Endpoints.Api,
    "{}",
    Methods.GET
  );
  const response = await getApiResponse(params);
  return new TestResponse(response);
}

export async function dbTestApi() {
  class DbTestResponse {
    constructor(res) {
      this.responseCode = extractResponseCode(DbTestResponseCodes, res);
      this.sucess = res.sucess;
      this.message = res.payload;
      return this;
    }
  }

  const params = new ApiRequestParameters(
    Endpoints.DbTest,
    "{}",
    Methods.GET
  );
  const response = await getApiResponse(params);
  return new DbTestResponse(response);
}

export async function dbTestCreateApi() {
  class DbTestCreateResponse {
    constructor(res) {
      this.responseCode = extractResponseCode(DbTestResponseCodes, res);
      this.sucess = res.sucess;
      this.message = res.msg;
      return this;
    }
  }

  const params = new ApiRequestParameters(
    Endpoints.DbTestCreate,
    "{}",
    Methods.POST);
  const response = await getApiResponse(params);
  return new DbTestCreateResponse(response);
}

export async function getQuestions(number_of_questions) {
  class GetQuestionsCreateResponse {
    constructor(res) {
      this.responseCode = extractResponseCode(GetQuestionsResponseCodes, res);
      const questions=[];
      
      res.map((question) => {
        const returnedQuestion = new Question()
        returnedQuestion.title = question.title
        returnedQuestion.option1 = question.option_1
        returnedQuestion.option2 = question.option_2
        returnedQuestion.option3=question.option_3
        returnedQuestion.option4=question.option_4
        returnedQuestion.option5=question.option_5
        returnedQuestion.answer=question.correct_answer
          questions.push(returnedQuestion)
        }
        )
    

      
      this.questions = questions
      return this;
    }
  }

  const params = new ApiRequestParameters(
    Endpoints.GetQuestions+String(number_of_questions),
    "{}",
    Methods.GET);
  const response = await getApiResponse(params);
  return new GetQuestionsCreateResponse(response);
}