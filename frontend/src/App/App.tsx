import { Lead, Notice, Page, Title } from './App.styles';

function App() {
  return (
    <Page>
      <Title>PDF Insight</Title>
      <Lead>Wgraj PDF, aby uzyskać podsumowanie i dane strukturalne.</Lead>
      <Notice>
        Treść dokumentu będzie przetwarzana przez API AI (po wdrożeniu backendu).
      </Notice>
    </Page>
  );
}

export default App;
