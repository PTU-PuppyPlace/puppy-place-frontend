'use client';

import styled from 'styled-components';

export const FormSection = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  align-items: center;
`;

export const FormGroup = styled.div<{ gap?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => gap || '8px'};
  width: 100%;
`;
