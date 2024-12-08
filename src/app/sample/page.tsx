'use client';

import { Alert } from '@/components/common/Alert';
import Button from '@/components/common/Button';
import { Checkbox, CheckMark } from '@/components/common/CheckControl';
// import { DatePicker } from '@/components/common/DatePicker';
import Segment from '@/components/common/Segment';
import Select from '@/components/common/Select';
import Spacer from '@/components/common/Spacer';
import TextArea from '@/components/common/TextArea';
import TextField from '@/components/common/TextField';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { componentTestAction } from '../lib/actions';

export default function SamplePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction] = useFormState(componentTestAction, null);

  return (
    <>
      <h1>Sample Component Testing Page</h1>
      <form action={formAction}>
        <Spacer />
        <TextField name='TextField' />
        <Spacer />
        <Checkbox name='Checkbox' />
        <Spacer />
        <CheckMark name='Checkmark' />
        <Spacer />
        <Select
          options={[
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
            { value: '3', label: 'Option 3' },
          ]}
          name='Select'
        />
        <Spacer />
        <TextArea />
        <Spacer />
        <Segment
          options={[
            { text: 'Option1' },
            { text: 'Option2' },
            { text: 'Option3' },
          ]}
        />
        <Button type='submit'>Submit</Button>
      </form>
      <Button onClick={() => setIsOpen(true)}>Alert 여는 버튼</Button>
      <Spacer />

      <Alert
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        Alert 테스트
      </Alert>
      {/* <DatePicker /> */}
    </>
  );
}
