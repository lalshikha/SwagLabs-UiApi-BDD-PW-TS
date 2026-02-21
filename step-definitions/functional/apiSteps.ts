import { Given } from '@cucumber/cucumber';
import  {Fixtures} from '../../fixtures/Fixtures';
import ApiService from '../../services/ApiService';

Given('API service validates {word} login', async function (this: Fixtures, userType: string) {
  // userType is accepted to keep Scenario Outline shape, but we only do a reachability check.
  const api = new ApiService(this.apiContext!);
  await api.validateSiteIsReachable();
});
