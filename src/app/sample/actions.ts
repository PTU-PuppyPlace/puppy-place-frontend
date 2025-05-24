'use server';

export async function componentTestAction(
  currentState: any,
  formData: FormData
) {
  const data = Object.fromEntries(formData);
  console.log('data', data);
  return {
    message: 'sample action success',
  };
}
