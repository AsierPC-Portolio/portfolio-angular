export * from './authentication.service';
import { AuthenticationService } from './authentication.service';
export * from './project.service';
import { ProjectService } from './project.service';
export const APIS = [AuthenticationService, ProjectService];
