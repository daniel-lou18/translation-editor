export function dashboardUrl() {
  return "/app/dashboard/workspace";
}

export function dashboardProjectsUrl() {
  return "/app/dashboard/projects";
}

export function projectsUrl() {
  return "/app/projects";
}

export function projectUrl(projectId: string | number) {
  return `/app/projects/${projectId}/documents`;
}

export function createProjectUrl() {
  return "/app/dashboard/projects/create";
}

export function documentUrl(projectId: string, documentId: string) {
  return `${projectUrl(projectId)}/documents/${documentId}`;
}

export function uploadDocumentAiUrl() {
  return "/app/dashboard/documents/upload/ai";
}

export function uploadDocumentManualUrl() {
  return "/app/dashboard/documents/upload/manual";
}

export function dashboardTranslationsUrl() {
  return "/app/dashboard/translations";
}

export function translationsUrl(projectId: string | number) {
  return `/app/projects/${projectId}/translations`;
}

export function translationUrl(
  projectId: string,
  documentId: string,
  translationId: string
) {
  return `${documentUrl(projectId, documentId)}/translations/${translationId}`;
}

export function dashboardTmsUrl() {
  return "/app/dashboard/tms";
}

export function tmsUrl(projectId: string | number) {
  return `/app/projects/${projectId}/tms`;
}

export function tmUrl(projectId: string, tmId: string) {
  return `/app/projects/${projectId}/tms/${tmId}`;
}

export function createTmUrl() {
  return "/app/dashboard/tms/create";
}

export function updateTmUrl() {
  return "/app/dashboard/tms/add-segments";
}

export function settingsUrl(projectId: string | number) {
  return `/app/projects/${projectId}/settings`;
}
