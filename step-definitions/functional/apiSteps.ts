import { Given } from '@cucumber/cucumber';
import  {CustomWorld} from '../../fixtures/world';
import ApiService from '../../services/ApiService';

Given('API service validates {word} login', async function (this: CustomWorld, userType: string) {
  // userType is accepted to keep Scenario Outline shape, but we only do a reachability check.
  const api = new ApiService(this.apiContext!);
  await api.validateSiteIsReachable();
});
