import { RolesGuard } from './../auth/roles-guard'
import { Roles } from './../auth/roles-auth.decorator'
import { JwtAuthGuard } from './../auth/jwt-auth.guard'
import { User } from './user.model'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

	constructor(private userService: UsersService) {

	}

	@ApiOperation({ summary: 'Создание пользователя' })
	@ApiResponse({ status: 200, type: User })
	@Post()
	create(@Body() userDto: CreateUserDto) {
		console.log(userDto)
		return this.userService.createUser(userDto)
	}

	@ApiOperation({ summary: 'Получить всех пользователей' })
	@ApiResponse({ status: 200, type: [User] })
	@Roles('admin')
	@UseGuards(RolesGuard)
	@Get()
	getAll() {
		return this.userService.getAllUsers()
	}
}
