import { SetMetadata } from '@nestjs/common'

export const NeedAdmin = (needAdmin: boolean) => SetMetadata('needAdmin', needAdmin)
