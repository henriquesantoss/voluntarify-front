export enum PAGES {
  LOGIN = '/login',
  CADASTRO_VOLUNTARY = '/cadastro/voluntario',
  CADASTRO_COMPANY = '/cadastro/empresa',
  PASSWORD_VOLUNTARY = '/senha/empresa',
  PASSWORD_COMPANY = '/senha/empresa',
  HOME_VOLUNTARY = '/inicio-voluntario',
  HOME_COMPANY = '/inicio-empresa',
  HOME = '/inicio',
  PERFIL_VOLUNTARY = '/perfil/[index]/voluntario',
  PERFIL_COMPANY = '/perfil/[index]/empresa',
  EDIT_PERFIL_VOLUNTARY = '/editar-perfil/[index]/voluntario',
  EDIT_PERFIL_COMPANY = '/editar-perfil/[index]/empresa',
  VACANCIES = '/vagas',
  VOLUNTER = '/voluntarios',
  VACANCIES_CADASTER = '/vagas-cadastrada',
  FAVORITE = '/favoritos',
  CREAT_VACANCIES = '/criar-vagas',
  RESET_PASSWORD = '/reset-password',
  RESET_PASSWORD_VOLUNTARY = '/reset-password/voluntario',
  RESET_PASSWORD_COMPANY = '/reset-password/empresa',
  EMAIL = '/recuperacao-email',
  EMAIL_VOLUNTARY = '/recuperacao-senha/voluntario',
  EMAIL_COMPANY = '/recuperacao-senha/empresa',
}

export const ROUTES = {
  LOGIN: {
    url: PAGES.LOGIN,
  },
  HOME: {
    url: PAGES.HOME,
  },
  VACANCIES: {
    url: PAGES.VACANCIES,
  },
  VOLUNTER: {
    url: PAGES.VOLUNTER,
  },
  VACANCIES_CADASTER: {
    url: PAGES.VACANCIES_CADASTER,
  },
  FAVORITE: {
    url: PAGES.FAVORITE,
  },
  CREAT_VACANCIES: {
    url: PAGES.CREAT_VACANCIES,
  },
  CADASTRO_VOLUNTARY: {
    url: PAGES.CADASTRO_VOLUNTARY,
  },
  PASSWORD_VOLUNTARY: {
    url: PAGES.PASSWORD_VOLUNTARY,
  },
  PASSWORD_COMPANY: {
    url: PAGES.PASSWORD_COMPANY,
  },
  CADASTRO_COMPANY: {
    url: PAGES.CADASTRO_COMPANY,
  },
  HOME_VOLUNTARY: {
    url: PAGES.HOME_VOLUNTARY,
  },
  HOME_COMPANY: {
    url: PAGES.HOME_COMPANY,
  },
  PERFIL_VOLUNTARY: {
    url: PAGES.PERFIL_VOLUNTARY,
  },
  PERFIL_COMPANY: {
    url: PAGES.PERFIL_COMPANY,
  },
  EDIT_PERFIL_VOLUNTARY: {
    url: PAGES.EDIT_PERFIL_VOLUNTARY,
  },
  EDIT_PERFIL_COMPANY: {
    url: PAGES.EDIT_PERFIL_COMPANY,
  },
  RESET_PASSWORD: {
    url: PAGES.RESET_PASSWORD,
  },
  RESET_PASSWORD_VOLUNTARY: {
    url: PAGES.RESET_PASSWORD_VOLUNTARY,
  },
  RESET_PASSWORD_COMPANY: {
    url: PAGES.RESET_PASSWORD_COMPANY,
  },
  EMAIL: {
    url: PAGES.EMAIL,
  },
  EMAIL_VOLUNTARY: {
    url: PAGES.EMAIL_VOLUNTARY,
  },
  EMAIL_COMPANY: {
    url: PAGES.EMAIL_COMPANY,
  },
}

export const INITIAL_PAGE = ROUTES.HOME.url

export const createRoute = (
  index: string[] | string | number,
  route: string,
) => {
  if (Array.isArray(index)) {
    return route.replace('[index]', index[0])
  }
  return route.replace('[index]', index ? index.toString() : '')
}
