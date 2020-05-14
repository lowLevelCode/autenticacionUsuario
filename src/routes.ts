import { AutenticacionUsuarioController } from "./controller/AutenticacionUsuario";

export const Routes = [
    {
        method: "post",
        route: "/autenticarUsuario",
        controller: AutenticacionUsuarioController,
        action: "autenticarUsuario"
    },
];