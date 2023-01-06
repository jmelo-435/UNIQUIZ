import {
  DbTestResponseCodes,
  TestResponseCodes,
} from "./ApiResponseCodes";
import axios from "axios";

const root = "http://localhost";

const Endpoints = Object.freeze({
  Test: "/api",
  DbTest: "/api/db_test",
  DbTestCreate: "/api/db_test/create",
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
