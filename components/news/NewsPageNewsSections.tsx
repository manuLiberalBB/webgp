import { AllNewsSectionWithFetch } from './AllNewsSectionWithFetch';
import { LatestNewsSectionWithFetch } from './LatestNewsSectionWithFetch';

export async function NewsPageNewsSections() {
  return (
    <>
      <LatestNewsSectionWithFetch />
      <AllNewsSectionWithFetch />
    </>
  );
}
