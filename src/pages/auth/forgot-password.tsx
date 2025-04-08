// components/LoginCard.tsx
import dynamic from "next/dynamic";
import Image from "next/image";

import { Stack, Typography } from "@mui/material";

const SmartInput = dynamic(() => import("@/common/components/SmartInput"), { ssr: false });
const SmartButton = dynamic(() => import("@/common/components/SmartButton"), { ssr: false });

import AuthLayout from "./_layout";

export default function ForgotPassword() {

  return (
    <AuthLayout>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          maxWidth: 400,
          p: 2,
          width: "100%",
          bgcolor: "background.paper",
          border: 1,
          borderColor: "divider",
          borderRadius: 2,
          mx: "auto",
          position: "relative",
        }}>

        <figure>
          <Image src="/assets/img/logotipo.webp"
            alt="Logotipo de Avan"
            width={250}
            height={100}
            style={{
              maxWidth: "100%",
              height: "auto",
              margin: "0 auto",
              display: "block",
            }}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <Typography variant="body2" mb={3} color="text.secondary" textAlign="center">
            Ingresa tu correo electrónico para recuperar tu contraseña
          </Typography>
        </figure>

        <Stack spacing={3} width={"100%"}>
          <SmartInput
            label="Correo electrónico"
            placeholder="Escribe tu correo electrónico"
            type="email"
            name="email"
            leftIcon={<img src="/assets/svg/mail-outline.svg" alt="correo" width="20" />}
            size="small"
            onChange={(val) => console.log(val)}
          />
        </Stack>

        <SmartButton
          label="Enviar"
          variant="contained"
          type="submit"
          fullWidth
          onClick={() => console.log("Iniciar sesión")}
        />

      </Stack>
    </AuthLayout>
  );
}
