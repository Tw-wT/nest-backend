import { UserRoles } from './../roles/user-roles.model'
import { Role } from './../roles/roles.model'
import { ApiProperty } from "@nestjs/swagger"
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript"

interface UserCreationAttrs {
	email: string
	password: string
}

@Table({tableName:'users'})
export class User extends Model<User, UserCreationAttrs> {
	@ApiProperty({example: '1', description: 'уникальный идентификатор'})
	@Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
	id: number

	@ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
	@Column({ type: DataType.STRING, unique: true, allowNull: false})
	email: string

	@ApiProperty({ example: '123123', description: 'Пароль' })
	@Column({ type: DataType.STRING, allowNull: false })
	password: string

	@ApiProperty({ example: 'true', description: 'Забанен или нет' })
	@Column({ type: DataType.BOOLEAN, defaultValue: false})
	banned: boolean

	@ApiProperty({ example: 'За спам', description: 'Причина бана' })
	@Column({ type: DataType.STRING, allowNull: true })
	banReason: string

	@BelongsToMany(() => Role, () => UserRoles)
	roles: Role[]
}