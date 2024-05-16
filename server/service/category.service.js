import client from '../db.js'

class CategoryService {
	async getCategory() {
		const response = await client.query(
			`
        select * from categore_services
        `
		)
		return response
	}
	async getCategoryById(id) {
		const response = await client.query(
			`
        select * from categore_services 
        WHERE categore_services.id = $1
        `,
			[id]
		)
		if (response.rows[0]) {
			return response.rows[0]
		} else {
			return 'Не найдено'
		}
	}
	async addCategory(data) {
		const response = await client.query(
			`INSERT INTO categore_services (name)
        VALUES ($1)
        RETURNING *`,
			[data.name]
		)
		return response.rows[0]
	}

	async updateCategory(id, data) {
		const response = await client.query(
			`UPDATE categore_services 
        SET name = $1
        WHERE id = $2
        RETURNING *`,
			[data.name, id]
		)
		return response.rows[0]
	}

	async deleteCategory(id) {
		const response = await client.query(
			'DELETE FROM categore_services WHERE id = $1',
			[id]
		)
		return response.rows[0]
	}
}

export default CategoryService
