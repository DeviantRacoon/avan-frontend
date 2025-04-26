"use client";

// Libraries
import React, { useState, useEffect } from "react";

// MUI
import AddIcon from "@mui/icons-material/Add";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

// Components
import RootLayout from "@/common/components/ui/layout";
import { SmartTable, Header, SmartButton, ModalForm, ConfirmModal } from "@/common/components";
import type { Row } from "@/common/models/interfaces/common/table-props.interface";

// Services
import { getUsers, createUser, updateUser } from "@/modules/user/user.services";

export default function Clients() {
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState({ isOpen: false, title: "", message: "" });
  const [showFormModal, setShowFormModal] = useState({ isOpen: false, isEdit: false });

  const [rows, setRows] = useState<Row[]>([]);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState<any>({});

  const handleSubmit = async (values: any) => {
    setLoading(true);

    let hasError;
    if (showFormModal.isEdit) {
      const { error } = await updateUser({ ...selected, fake_user: 0, id_user: selected.idUser });
      hasError = error;
    } else {
      const data = { live: "1", id_client: "1", id_team: "0", user_id: values.idUser, ...values };
      const { error } = await createUser(data);
      hasError = error;
    };

    if (hasError) {
      console.error(hasError);
      setLoading(false);
      return;
    }

    await fetchData();
    setShowFormModal({ isOpen: false, isEdit: false });
    setLoading(false);
  };

  const fetchData = async () => {
    const { response, error } = await getUsers();

    if (error) {
      console.error(error);
      return;
    }

    setRows(response.data);
    setTotal(response.data.length);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleConfirm = () => {
    setShowConfirmModal({ ...showConfirmModal, isOpen: false });
  };

  const handleCreate = () => {
    setSelected({});
    setShowFormModal({ ...showFormModal, isOpen: false })
  };

  const handleEdit = (row: Row) => {
    setSelected({ ...row, new_user: row.username });
    setShowFormModal({ isOpen: true, isEdit: true });
  };

  const handleDelete = (row: Row) => {
    setShowConfirmModal({
      isOpen: true,
      title: "Eliminar usuario",
      message: `¿Estás seguro de que deseas eliminar a ${row.name}?`,
    });
  };

  return (
    <RootLayout>
      <Header
        title="Usuarios"
        description="Administra todos los usuarios registrados en el sistema."
        icon={<PeopleAltIcon fontSize="large" color="primary" />}
        actions={
          <SmartButton
            label="Agregar usuario"
            variant="contained"
            leftIcon={<AddIcon />}
            onClick={() => {
              setShowFormModal({ isOpen: true, isEdit: false });
            }}
          />
        }
      />

      <SmartTable
        onClick={(row) => console.log(row)}
        filters={[
          {
            label: "Estado",
            key: "logged",
            options: [
              { label: "Web", value: "Online web" },
              { label: "App", value: "Online app" },
              { label: "Offline", value: "offline" },
            ],
          },
        ]}
        columns={[
          { id: "username", label: "Nombre", tooltip: true, size: "sm" },
          { id: "mail", label: "Email", size: "sm" },
          { id: "phone", label: "Teléfono", size: "xs" },
          { id: "ds_profile", label: "Perfil", size: "sm", tooltip: true },
          { id: "logged", label: "Acceso", type: "status", size: "xs", align: "center" },
          { id: "dt_last", label: "Ult. Acceso", type: "datetime", tooltip: true },
        ]}
        rows={rows}
        total={total}
        actions={[
          { label: "Editar", icon: <span>✏️</span>, onClick: handleEdit },
          { label: "Eliminar", icon: <span>🗑️</span>, onClick: handleDelete },
        ]}
      />

      <ConfirmModal
        {...showConfirmModal}
        onClose={() => {
          setShowConfirmModal({ ...showConfirmModal, isOpen: false });
        }}
        onConfirm={handleConfirm}
      />

      <ModalForm
        loading={loading}
        data={selected}
        isOpen={showFormModal.isOpen}
        onClose={handleCreate}
        onSubmit={handleSubmit}
        title="Registrar usuario"
        description="Completa el siguiente formulario para registrar un nuevo usuario."
        schema={[
          {
            key: "new_user",
            label: "Usuario",
            required: true
          },
          {
            key: "mail",
            label: "Correo",
            type: "email",
            required: true,
            pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "El correo no es válido." },
            breakpoint: { xs: 6 },
          },
          {
            key: "pass",
            label: "Contraseña",
            type: "password",
            minLength: showFormModal.isEdit ? 0 : 8,
            pattern: showFormModal.isEdit ? undefined : { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: "La contraseña debe tener al menos 8 caracteres, una letra y un número." },
            breakpoint: { xs: 6 },
            required: !showFormModal.isEdit
          },
          {
            key: "name",
            label: "Nombre",
            required: true
          },
          {
            key: "fl_name",
            label: "Apellido Paterno",
            required: true,
            breakpoint: { xs: 6 },
          },
          {
            key: "ml_name",
            label: "Apellido Materno",
            required: true,
            breakpoint: { xs: 6 },
          },
          {
            key: "profile",
            label: "Perfil",
            type: "select",
            required: true,
            options: [{ label: "Gerente", value: "5" }],
            breakpoint: { xs: 6 },
          },
          {
            key: "phone",
            label: "Celular",
            type: "tel",
            required: true,
            breakpoint: { xs: 6 },
          },
        ]}
      />
    </RootLayout>
  );
}
