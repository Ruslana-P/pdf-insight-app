import { useId, useState, type ReactNode } from 'react';
import { Chevron, HeaderButton, Panel, Root } from './Accordion.styles';

export type AccordionProps = {
  title: string;
  children: ReactNode;
  /** Panel open on first render. */
  defaultExpanded?: boolean;
};

export function Accordion({
  title,
  children,
  defaultExpanded = false,
}: AccordionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const headerId = useId();
  const panelId = useId();

  return (
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
      <Panel id={panelId} role="region" aria-labelledby={headerId} hidden={!expanded}>
        {children}
      </Panel>
    </Root>
  );
}
