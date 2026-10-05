import { useId, useState, type ReactNode } from 'react';
import { Chevron, HeaderButton, Panel, Root } from '../Accordion/Accordion.styles';
import {
  CollapsiblePanel,
  MobileAccordionShell,
  ResponsiveSectionWrap,
  WebSectionBody,
  WebSectionHeading,
} from './InsightResults.styles';

export type ResponsiveResultsSectionProps = {
  title: string;
  defaultExpanded?: boolean;
  renderContent: () => ReactNode;
};

/** Accordion on mobile/tablet; always expanded flat section on web (≥1024px). */
export function ResponsiveResultsSection({
  title,
  defaultExpanded = false,
  renderContent,
}: ResponsiveResultsSectionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const headerId = useId();
  const panelId = useId();

  return (
    <ResponsiveSectionWrap>
      <WebSectionHeading>{title}</WebSectionHeading>
      <WebSectionBody>{renderContent()}</WebSectionBody>

      <MobileAccordionShell>
        <Root>
          <HeaderButton
            type="button"
            id={headerId}
            aria-expanded={expanded}
            aria-controls={panelId}
            onClick={() => setExpanded((open) => !open)}
          >
            <span>{title}</span>
            <Chevron $expanded={expanded} aria-hidden>
              ▼
            </Chevron>
          </HeaderButton>
          <CollapsiblePanel
            id={panelId}
            role="region"
            aria-labelledby={headerId}
            $expanded={expanded}
          >
            <Panel>{renderContent()}</Panel>
          </CollapsiblePanel>
        </Root>
      </MobileAccordionShell>
    </ResponsiveSectionWrap>
  );
}
