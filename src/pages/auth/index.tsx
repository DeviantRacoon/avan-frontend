// components/LoginCard.tsx
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

import { Stack, Typography } from "@mui/material";

const SmartInput = dynamic(() => import("@/common/components/SmartInput"), { ssr: false });
const SmartButton = dynamic(() => import("@/common/components/SmartButton"), { ssr: false });

import AuthLayout from "./_layout";

export default function Login() {

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
            Inicia sesión para continuar
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

          <SmartInput
            label="Contraseña"
            placeholder="Escribe tu contraseña"
            name="password"
            type="password"
            leftIcon={<img src="/assets/svg/lock-closed-outline.svg" alt="contraseña" width="20" />}
            size="small"
            onChange={(val) => console.log(val)}
          />
        </Stack>

        <SmartButton
          label="Iniciar sesión"
          variant="contained"
          type="submit"
          fullWidth
          onClick={() => console.log("Iniciar sesión")}
        />

        <Typography variant="body2" mt={4} mb={2} color="text.secondary" textAlign="center">
          ¿Olvidaste tu contraseña?&nbsp;
          <Link href="/auth/forgot-password">Olvidé mi contraseña</Link>
        </Typography>

      </Stack>
    </AuthLayout>
  );
}
