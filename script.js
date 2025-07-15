const ramos = [
  // Semestre 1
  { nombre: "Fundamentos de los Alimentos y Nutrición", id: "fundamentos", requisitos: [] },
  { nombre: "Alimentos", id: "alimentos", requisitos: [] },
  { nombre: "Biología Celular", id: "biologia", requisitos: [] },
  { nombre: "Química General y Orgánica", id: "quimica", requisitos: [] },
  { nombre: "Matemáticas Elemental", id: "mate", requisitos: [] },
  { nombre: "Habilidades Comunicativas", id: "habilidades", requisitos: [] },

  // Semestre 2
  { nombre: "Química de los Alimentos", id: "quimica_alimentos", requisitos: ["quimica", "mate"] },
  { nombre: "Microbiología", id: "micro", requisitos: ["biologia"] },
  { nombre: "Bioquímica Nutricional", id: "bioquimica", requisitos: ["quimica"] },
  { nombre: "Morfología", id: "morfologia", requisitos: ["biologia"] },
  { nombre: "Inglés I", id: "ingles1", requisitos: [] },

  // Semestre 3
  { nombre: "Técnicas Dietéticas", id: "tecnicas", requisitos: ["quimica_alimentos"] },
  { nombre: "Fisiopatología I", id: "fisiopato1", requisitos: ["bioquimica", "morfologia"] },
  { nombre: "Higiene y Control de los Alimentos", id: "higiene", requisitos: ["micro", "alimentos"] },
  { nombre: "Psicología y Educación en Salud", id: "psicologia", requisitos: [] },
  { nombre: "Salud Pública I", id: "saludpub1", requisitos: ["mate", "fundamentos"] },

  // Semestre 4
  { nombre: "Bromatología", id: "bromatologia", requisitos: ["tecnicas", "higiene"] },
  { nombre: "Fisiopatología II", id: "fisiopato2", requisitos: ["fisiopato1"] },
  { nombre: "Nutrición Humana", id: "nutricion", requisitos: ["fisiopato1"] },
  { nombre: "Salud Pública II", id: "saludpub2", requisitos: ["saludpub1", "psicologia"] },
  { nombre: "Inglés II", id: "ingles2", requisitos: ["ingles1"] },

  // Semestre 5
  { nombre: "Razonamiento Científico", id: "razonamiento", requisitos: ["habilidades"] },
  { nombre: "Educación en Alimentación", id: "educacion", requisitos: ["psicologia"] },
  { nombre: "Evaluación Nutricional", id: "evaluacion", requisitos: ["fisiopato2", "nutricion"] },
  { nombre: "Ciclo Vital", id: "ciclo_vital", requisitos: ["fisiopato2", "nutricion"] },
  { nombre: "Metodología de la Investigación", id: "investigacion", requisitos: ["saludpub2", "nutricion"] },
  { nombre: "Gestión en Salud", id: "gestion", requisitos: ["saludpub2", "nutricion"] },

  // Semestre 6
  { nombre: "Dietoterapia Adulto", id: "dieto_adulto", requisitos: ["evaluacion", "ciclo_vital"] },
  { nombre: "Proyectos de Intervención", id: "proyectos", requisitos: ["evaluacion", "investigacion"] },
  { nombre: "Farmacología", id: "farmaco", requisitos: ["ciclo_vital", "ingles4"] },
  { nombre: "Alimentación Institucional I", id: "inst1", requisitos: ["bromatologia", "ciclo_vital"] },
  { nombre: "Gestión y Calidad I", id: "calidad1", requisitos: ["gestion"] },
  { nombre: "Integrado I", id: "integrado1", requisitos: ["educacion", "evaluacion", "ciclo_vital"] },

  // Semestre 7
  { nombre: "Dietoterapia Materno Infantil", id: "dieto_materno", requisitos: ["dieto_adulto", "integrado1", "farmaco"] },
  { nombre: "Nutrición y Deporte", id: "deporte", requisitos: ["dieto_materno"] },
  { nombre: "Nutrición Comunitaria I", id: "comunitaria1", requisitos: ["proyectos", "integrado1"] },
  { nombre: "Alimentación Institucional II", id: "inst2", requisitos: ["inst1"] },
  { nombre: "Nutrición Comunitaria II", id: "comunitaria2", requisitos: ["comunitaria1"] },
  { nombre: "Gestión y Calidad II", id: "calidad2", requisitos: ["calidad1"] },
  { nombre: "Pensamiento Crítico", id: "pensamiento", requisitos: ["razonamiento"] },
  { nombre: "Bioética", id: "bioetica", requisitos: ["comunitaria1"] },
  { nombre: "Innovación Alimentaria", id: "innovacion", requisitos: ["inst2", "calidad2"] },

  // Semestre 8
  { nombre: "Integrado II", id: "integrado2", requisitos: ["dieto_materno", "comunitaria1", "inst2"] },
  { nombre: "Responsabilidad Social", id: "social", requisitos: ["pensamiento"] },

  // Semestres 9 y 10
  { nombre: "Internado Clínico", id: "internado1", requisitos: ["integrado2"] },
  { nombre: "Internado Institucional", id: "internado2", requisitos: ["integrado2"] },
  { nombre: "Internado Comunitario", id: "internado3", requisitos: ["integrado2"] },

  // Inglés IV
  { nombre: "Inglés IV", id: "ingles4", requisitos: ["ingles2"] },
];

const estado = {};
const grid = document.getElementById("grid");

function crearMalla() {
  ramos.forEach(ramo => {
    estado[ramo.id] = {
      aprobado: false,
      bloqueado: ramo.requisitos.length > 0,
    };

    const div = document.createElement("div");
    div.className = "ramo" + (estado[ramo.id].bloqueado ? " bloqueado" : "");
    div.dataset.id = ramo.id;
    div.innerText = ramo.nombre;
    div.addEventListener("click", () => aprobarRamo(ramo.id));
    grid.appendChild(div);
  });
}

function aprobarRamo(id) {
  if (estado[id].bloqueado || estado[id].aprobado) return;

  estado[id].aprobado = true;
  const div = document.querySelector(`[data-id=\"${id}\"]`);
  div.classList.add("aprobado");
  div.classList.remove("bloqueado");

  ramos.forEach(ramo => {
    if (estado[ramo.id].bloqueado) {
      const requisitosOk = ramo.requisitos.every(req => estado[req]?.aprobado);
      if (requisitosOk) {
        estado[ramo.id].bloqueado = false;
        const r = document.querySelector(`[data-id=\"${ramo.id}\"]`);
        r.classList.remove("bloqueado");
      }
    }
  });
}

crearMalla();
