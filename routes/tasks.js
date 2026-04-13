const express = require("express");
const router = express.Router();
const Task = require("../models/Task.js");

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         _id:
 *           type: string
 *           description: ID autogenerado por MongoDB
 *           example: "64f1a2b3c4d5e6f7a8b9c0d1"
 *         title:
 *           type: string
 *           description: Título de la tarea
 *           example: "Comprar leche"
 *         completed:
 *           type: boolean
 *           description: Estado de la tarea
 *           default: false
 *           example: false
 *     TaskInput:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           description: Título de la tarea
 *           example: "Comprar leche"
 *     MessageResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Operación completada"
 *         task:
 *           $ref: '#/components/schemas/Task'
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Hubo un problema al procesar la solicitud"
 */

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API para gestión de tareas
 */

/**
 * @swagger
 * /tasks/create:
 *   post:
 *     summary: Crear una nueva tarea
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/create", async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, completed: false });
    res.status(201).send({ message: "Task successfully created", task });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "There was a problem trying to create a task" });
  }
});

/**
 * @swagger
 * /tasks/:
 *   get:
 *     summary: Obtener todas las tareas
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Lista de tareas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (error) {
    console.error(error);
  }
});

/**
 * @swagger
 * /tasks/id/{_id}:
 *   get:
 *     summary: Obtener una tarea por ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea a obtener
 *         example: "64f1a2b3c4d5e6f7a8b9c0d1"
 *     responses:
 *       200:
 *         description: Tarea encontrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       500:
 *         description: Error al buscar la tarea
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/id/:_id", async (req, res) => {
  try {
    const task = await Task.findById(req.params._id);
    res.send(task);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message:
        "There was a problem with the task with _id number: " + req.params._id,
    });
  }
});

/**
 * @swagger
 * /tasks/markAsCompleted/{_id}:
 *   put:
 *     summary: Marcar una tarea como completada
 *     description: Actualiza el estado `completed` a `true`. No permite modificar el título.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea a marcar como completada
 *         example: "64f1a2b3c4d5e6f7a8b9c0d1"
 *     responses:
 *       200:
 *         description: Tarea marcada como completada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       500:
 *         description: Error al actualizar la tarea
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put("/markAsCompleted/:_id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params._id,
      { completed: true },
      { new: true },
    );
    res.send({ message: "Task successfully updated", task });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message:
        "There was a problem trying to update the task with _id: " +
        req.params._id,
    });
  }
});

/**
 * @swagger
 * /tasks/id/{_id}:
 *   put:
 *     summary: Actualizar una tarea por ID
 *     description: Permite actualizar cualquier campo de la tarea, incluido el título.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea a actualizar
 *         example: "64f1a2b3c4d5e6f7a8b9c0d1"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       500:
 *         description: Error al actualizar la tarea
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put("/id/:_id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
    });
    res.send({ message: "task successfully updated", task });
  } catch (error) {
    console.error(error);
  }
});

/**
 * @swagger
 * /tasks/id/{_id}:
 *   delete:
 *     summary: Eliminar una tarea por ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea a eliminar
 *         example: "64f1a2b3c4d5e6f7a8b9c0d1"
 *     responses:
 *       200:
 *         description: Tarea eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       500:
 *         description: Error al eliminar la tarea
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete("/id/:_id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params._id);
    res.send({ message: "task deleted", task });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "There was a problem trying to delete a task" });
  }
});

module.exports = router;
