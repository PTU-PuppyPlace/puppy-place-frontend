# api

services 에서 지정한 api 를 front 서버의 api를 이용하여 호출하도록 도와주는 폴더

ex)

```
// src/seervices/dog/getUserDog.ts
import { apiBe } from '@/services';

export const getUserDog = () => apiBe('/user/dog');

```

```
// src/app/api/userdog/route.ts
import {getUserDog} from '@/services';

export async function POST() {
  const res: any = getUserDog();
  return NextResponse.json({
    data: res,
  });
}
```
