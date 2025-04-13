import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getUserFromSession } from "@/lib/auth-utils"

// Update a task
export async function PUT(request: Request, { params }: { params: { id: string; taskId: string } }) {
  try {
    const user = await getUserFromSession()
    if (!user) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    const applicationId = params.id
    const taskId = params.taskId
    const { title, description, dueDate, completed } = await request.json()

    // Check if application exists and belongs to user
    const applicationCheck = await db.query(
      `SELECT a.id 
       FROM applications a
       JOIN application_tasks t ON t.application_id = a.id
       WHERE a.id = $1 AND a.user_id = $2 AND t.id = $3`,
      [applicationId, user.id, taskId],
    )

    if (applicationCheck.length === 0) {
      return NextResponse.json({ message: "Task not found or access denied" }, { status: 404 })
    }

    // Update task
    let query = "UPDATE application_tasks SET updated_at = NOW()"
    const queryParams = []
    let paramIndex = 1

    if (title !== undefined) {
      query += `, title = $${paramIndex}`
      queryParams.push(title)
      paramIndex++
    }

    if (description !== undefined) {
      query += `, description = $${paramIndex}`
      queryParams.push(description)
      paramIndex++
    }

    if (dueDate !== undefined) {
      query += `, due_date = $${paramIndex}`
      queryParams.push(dueDate)
      paramIndex++
    }

    if (completed !== undefined) {
      query += `, completed = $${paramIndex}`
      queryParams.push(completed)
      paramIndex++
    }

    queryParams.push(taskId)
    query += ` WHERE id = $${paramIndex} RETURNING id, title, description, due_date, completed, updated_at`

    const result = await db.query(query, queryParams)

    return NextResponse.json({
      message: "Task updated successfully",
      task: result[0],
    })
  } catch (error) {
    console.error("Error updating task:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// Delete a task
export async function DELETE(request: Request, { params }: { params: { id: string; taskId: string } }) {
  try {
    const user = await getUserFromSession()
    if (!user) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    const applicationId = params.id
    const taskId = params.taskId

    // Check if application exists and belongs to user
    const applicationCheck = await db.query(
      `SELECT a.id 
       FROM applications a
       JOIN application_tasks t ON t.application_id = a.id
       WHERE a.id = $1 AND a.user_id = $2 AND t.id = $3`,
      [applicationId, user.id, taskId],
    )

    if (applicationCheck.length === 0) {
      return NextResponse.json({ message: "Task not found or access denied" }, { status: 404 })
    }

    // Delete task
    await db.query("DELETE FROM application_tasks WHERE id = $1", [taskId])

    return NextResponse.json({ message: "Task deleted successfully" })
  } catch (error) {
    console.error("Error deleting task:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
