
function index(req, res) {
  console.log("Entra en el controlador")
  req.getConnection((err, conn) => {
    console.log("Ejecuta la select")
    conn.query('SELECT 	d.id_dosis as id, d.hora as hora, d.cantidad as cantidad, m.nombre_Medicamento as medicamento FROM dosis d, medicamentos m WHERE	d.id_medicamento = m.id_medicamento AND		d.id_usuario = 1 ;', (err, tasks) => {
      if(err) {
        console.log("Error en la select")
        res.json(err);
      }      
      console.log("Sigue sin problemas")
      res.render('tasks/index', { tasks });
    });    
  });
  console.log("Salimos del INDEX")
}

function create(req, res) {
  console.log("Entra en el CREATE")
  res.render('tasks/create');
}

function store(req, res) {
  console.log("Entra en el STORE")
  const data = req.body;

  req.getConnection((err, conn) => {
    console.log("Va a hacer insert")
    conn.query('INSERT INTO dosis SET ?', [data], (err, rows) => {
      console.log("Insert OK")
      res.redirect('/tasks');
    });    
  });
  console.log("Salimos del STORE")
}

function destroy(req, res) {
  console.log("Entra en el destroy")
  const id = req.body.id;

  req.getConnection((err, conn) => {
    console.log("Va a hacer el delete")
    conn.query('DELETE FROM dosis WHERE id = ?', [id], (err, rows) => {
      res.redirect('/tasks');
    });
  })
  console.log("Salimos del destroy")
}

function edit(req, res) {
  console.log("Entra en el edit")
  const id = req.params.id;

  req.getConnection((err, conn) => {
    console.log("Hace el select del edit")
    conn.query('SELECT * FROM dosis WHERE id = ?', [id], (err, tasks) => {
      if(err) {
        console.log("Error del select de edit")
        res.json(err);
      }
      res.render('tasks/edit', { tasks });
    });
  });
  console.log("Salimos del edit")
}

function update(req, res) {
  const id = req.params.id;
  const data = req.body;

  req.getConnection((err, conn) => {
    conn.query('UPDATE dosis SET ? WHERE id = ?', [data, id], (err, rows) => {
      res.redirect('/tasks');
    });
  });
}


module.exports = {
  index: index,
  create: create,
  store: store,
  destroy: destroy,
  edit: edit,
  update: update,
}
