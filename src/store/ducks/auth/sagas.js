import { put } from "@redux-saga/core/effects";
import * as jwt from "jsonwebtoken";
import {
  failedLoadAuthentication,
  failureAuthentication,
  successAuthentication,
} from "./actions";
import { authentication } from "../../../services/api";

export function* authenticationRequested(action) {
  const { email, password } = action.payload;

  const [result, data] = yield authentication.login(email, password);

  if (result) {
    yield put(successAuthentication(data));
    localStorage.setItem("auth", data);
  } else {
    yield put(failureAuthentication(data));
    localStorage.removeItem("auth");
  }
}

export function* authentcationLoad() {
  const token = localStorage.getItem("auth");
  const guid =
    process.env.REACT_APP_JWT_SECRET_KEY ||
    "1cb26f40-498b-4f72-a00a-e8633abc5957";

  if (token) {
    try {
      jwt.verify(token, guid);
      yield put(successAuthentication(token));
    } catch (error) {
      yield put(failedLoadAuthentication());
    }
  } else {
    yield put(failedLoadAuthentication());
  }
}
