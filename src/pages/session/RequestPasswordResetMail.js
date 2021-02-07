import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from "@material-ui/core";

import {
  Card, Button, Input, InputGroup,
} from "../../components";
import AuthenticationService from "../../services/AuthenticationService";

import unifesoLogo from "../../img/unifeso-logo-branco.svg";

const Layout = styled.div`
  display: grid;
  place-items: center;
`;

export const RequestPasswordResetMail = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [response, setResponse] = useState({
    header: "",
    body: "",
    success: false,
  });
  const [disableButton, setDisableButton] = useState(false);
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const handleResetPasswordEmail = async ({ email }) => {
    setDisableButton(true);

    try {
      const success = await AuthenticationService.resetPasswordEmail(email);

      if (success) {
        setResponse({
          header: "Email enviado",
          body: "Verifique sua caixa de entrada",
          success,
        });
      } else {
        setResponse({
          header: "Falha ao redefinir senha",
          body: "Verifique seu email e tente novamente",
          success,
        });
      }
    } catch (error) {
      setResponse({
        header: "Falha ao redefinir senha",
        body: "Tente novamente mais tarde ou entre em contato com o administrador",
        success: false,
      });
    }

    setDisableButton(false);
    setModalOpen(true);
  };

  const confirmModal = () => {
    if (response.success) {
      history.push("/");
    } else {
      setModalOpen(false);
    }
  };

  return (
    <Layout className="w-screen h-screen bg-primary-normal">
      <Dialog open={modalOpen} onClose={() => confirmModal()}>
        <DialogTitle id="form-dialog-title">{response.header}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {response.body}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => confirmModal()}>Vou checar</Button>
        </DialogActions>
      </Dialog>
      <div>
        <img
          alt="Logo do Unifeso"
          src={unifesoLogo}
          style={{ width: "85%", margin: "auto" }}
        />
        <Card title="Recuperação de Senha">
          <form
            onSubmit={handleSubmit(handleResetPasswordEmail)}
            className="w-full h-full md:max-w-xl md:h-auto"
          >
            <InputGroup>
              <label>Email</label>
              <Input
                type="email"
                autoComplete="email"
                name="email"
                ref={register({ required: true })}
              />
            </InputGroup>
            <InputGroup className="mt-4">
              <Button
                type="submit"
                disabled={disableButton}
              >
                Enviar e-mail de redefinição
              </Button>
            </InputGroup>
          </form>

          <div
            className="mt-3 w-full text-center"
          >
            <button
              onClick={() => history.push("/")}
              className="text-gray-700 hover:text-gray-900 transition duration-300 ease-in-out"
            >
              Voltar
            </button>
          </div>
        </Card>
      </div>
    </Layout>
  );
};
