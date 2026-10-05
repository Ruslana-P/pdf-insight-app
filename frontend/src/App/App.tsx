import { AnalysisHistory } from '../components/AnalysisHistory';
import { DocumentAnalysis } from '../components/DocumentAnalysis';
import { ScrollToTop } from '../components/ScrollToTop';
import { useAnalysisHistory } from '../lib/analysisHistory/useAnalysisHistory';
import { APP_COPY } from '../lib/constants';
import { Hero, Lead, LeadEmphasis, Page, Title } from './App.styles';

function App() {
  const { entries, addEntry, removeEntry, clearHistory } = useAnalysisHistory();

  return (
    <>
      <Page>
        <Hero>
          <Title>{APP_COPY.title}</Title>
          <Lead>
            {APP_COPY.lead} <LeadEmphasis>{APP_COPY.leadEmphasis}</LeadEmphasis>
          </Lead>
        </Hero>

        <DocumentAnalysis onAnalysisSuccess={addEntry} />

        <AnalysisHistory
          entries={entries}
          onRemoveEntry={removeEntry}
          onClearHistory={clearHistory}
        />
      </Page>
      <ScrollToTop />
    </>
  );
}

export default App;
