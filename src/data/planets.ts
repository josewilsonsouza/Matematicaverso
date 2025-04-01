export interface Planet {
  id: string;
  name: string;
  description: string;
  funnyDescription: string;
  color: string;
  size: number;
  orbitRadius: number;
  orbitDuration: number;
  topics: { title: string; description: string }[];
  concepts: string[];
  connections: string[];
}

export interface Intersection {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  planetIds: string[];
  position: { x: number; y: number };
  connection: string;
  formula: string;
}

export const planets: Planet[] = [
  {
    id: "complex",
    name: "Planeta Complex (C)",
    description: "The fascinating realm of complex numbers, where mathematicians explore numbers with both real and imaginary parts.",
    funnyDescription: "🌀 Onde até a imaginação tem valor real! Se você busca uma relação complicada, estamos aqui. 𝑖² = -1 (e sim, é complexo mesmo)",
    color: "#9b87f5",
    size: 60,
    orbitRadius: 300,
    orbitDuration: 45,
    topics: [
      {
        title: "Complex Plane",
        description: "The geometric representation of complex numbers as points in a two-dimensional plane."
      },
      {
        title: "Euler's Formula",
        description: "The elegant equation e^(iπ) + 1 = 0 that connects complex exponentials to trigonometric functions."
      },
      {
        title: "Complex Analysis",
        description: "The study of functions of complex variables, including analytic continuation and residue theory."
      },
      {
        title: "Applications in Physics",
        description: "Complex numbers are essential in quantum mechanics, electromagnetism, and signal processing."
      }
    ],
    concepts: [
      "Complex numbers (a + bi)",
      "Argand plane",
      "Modulus and argument",
      "Holomorphic functions",
      "Cauchy-Riemann equations",
      "Residue theorem"
    ],
    connections: ["prime", "topology", "analysis"]
  },
  {
    id: "prime",
    name: "Planeta Prime (P)",
    description: "The mysterious world of prime numbers, the building blocks of mathematics that continue to reveal new patterns and properties.",
    funnyDescription: "🔢 O clube mais exclusivo da matemática. Não somos divisíveis por ninguém (exceto 1 e nós mesmos). Very prime, much wow!",
    color: "#FF5252",
    size: 50,
    orbitRadius: 450,
    orbitDuration: 60,
    topics: [
      {
        title: "Prime Number Theorem",
        description: "Describes the asymptotic distribution of prime numbers among positive integers."
      },
      {
        title: "Riemann Hypothesis",
        description: "One of the most important unsolved problems in mathematics, concerning the distribution of prime numbers."
      },
      {
        title: "Prime Factorization",
        description: "The decomposition of a composite number into a product of prime numbers."
      },
      {
        title: "Cryptography",
        description: "The use of prime numbers in RSA encryption and other cryptographic systems."
      }
    ],
    concepts: [
      "Prime numbers",
      "Prime factorization",
      "Sieve of Eratosthenes",
      "Twin primes",
      "Mersenne primes",
      "Prime number theorem"
    ],
    connections: ["complex", "algebra"]
  },
  {
    id: "topology",
    name: "Planeta Topology",
    description: "A realm where shape and space are explored through properties that remain unchanged under continuous deformations.",
    funnyDescription: "🍩 Aqui você pode ser qualquer coisa! Uma xícara de café é igual a uma rosquinha (topologicamente falando). Traga seu próprio espaço vetorial!",
    color: "#49c5b6",
    size: 70,
    orbitRadius: 600,
    orbitDuration: 75,
    topics: [
      {
        title: "Manifolds",
        description: "Spaces that locally resemble Euclidean space, serving as domains for geometric structures."
      },
      {
        title: "Knot Theory",
        description: "The study of mathematical knots and their properties in three-dimensional space."
      },
      {
        title: "Homology",
        description: "A way to associate algebraic objects to topological spaces to detect holes and connectivity."
      },
      {
        title: "Differential Topology",
        description: "The study of differentiable functions on differentiable manifolds."
      }
    ],
    concepts: [
      "Topological spaces",
      "Continuous functions",
      "Homeomorphisms",
      "Homotopy",
      "Manifolds",
      "Fixed point theorems"
    ],
    connections: ["complex", "geometry"]
  },
  {
    id: "analysis",
    name: "Planeta Analysis",
    description: "The domain of limits, continuity, and change, where calculus reveals the dynamic behavior of functions and sequences.",
    funnyDescription: "📉📈 Calcular infinitos não é tão difícil quanto parece! Apenas precisamos de limites. Seja cauchy e convergente conosco!",
    color: "#FFAA00",
    size: 65,
    orbitRadius: 350,
    orbitDuration: 50,
    topics: [
      {
        title: "Real Analysis",
        description: "The rigorous study of real numbers, sequences, series, and their properties."
      },
      {
        title: "Functional Analysis",
        description: "The study of vector spaces and functions between them, with applications in quantum mechanics."
      },
      {
        title: "Differential Equations",
        description: "Equations that relate functions with their derivatives, used to model physical phenomena."
      },
      {
        title: "Measure Theory",
        description: "A systematic way to assign a number to subsets of a space, generalizing concepts like length and volume."
      }
    ],
    concepts: [
      "Limits and continuity",
      "Differentiation and integration",
      "Sequences and series",
      "Banach and Hilbert spaces",
      "Lebesgue integration",
      "Partial differential equations"
    ],
    connections: ["complex", "algebra", "geometry"]
  },
  {
    id: "algebra",
    name: "Planeta Algebra",
    description: "The abstract study of mathematical symbols and the rules for manipulating these symbols, forming the language of mathematics.",
    funnyDescription: "🧮 O lugar onde as letras valem mais que números. Se x² + y² = z² te deixa feliz, você é um de nós! #ÁlgebraParaSempre",
    color: "#36dd45",
    size: 55,
    orbitRadius: 520,
    orbitDuration: 65,
    topics: [
      {
        title: "Group Theory",
        description: "The study of algebraic structures known as groups and their properties."
      },
      {
        title: "Linear Algebra",
        description: "The branch of mathematics concerning vector spaces, linear mappings, and systems of linear equations."
      },
      {
        title: "Galois Theory",
        description: "The study of field extensions and their relationship to the solvability of polynomial equations."
      },
      {
        title: "Representation Theory",
        description: "The study of abstract algebraic structures by representing their elements as linear transformations of vector spaces."
      }
    ],
    concepts: [
      "Groups, rings, and fields",
      "Vector spaces",
      "Matrices and determinants",
      "Eigenvalues and eigenvectors",
      "Homomorphisms",
      "Polynomials and equations"
    ],
    connections: ["prime", "analysis", "geometry"]
  },
  {
    id: "geometry",
    name: "Planeta Geometry",
    description: "The study of shapes, sizes, positions, and properties of space, from Euclidean to non-Euclidean and differential geometries.",
    funnyDescription: "📐 Triângulos, círculos e uma obsessão com o número π! Venha para o único lugar onde 'ser quadrado' é um elogio!",
    color: "#4d7cff",
    size: 75,
    orbitRadius: 400,
    orbitDuration: 55,
    topics: [
      {
        title: "Euclidean Geometry",
        description: "The study of geometry based on Euclid's axioms, focusing on planes and three-dimensional space."
      },
      {
        title: "Non-Euclidean Geometry",
        description: "Geometries that deviate from Euclidean geometry, such as spherical and hyperbolic geometries."
      },
      {
        title: "Differential Geometry",
        description: "The application of differential calculus to the study of curves and surfaces in space."
      },
      {
        title: "Projective Geometry",
        description: "The study of geometric properties that are invariant under projective transformations."
      }
    ],
    concepts: [
      "Points, lines, and planes",
      "Triangles and circles",
      "Curves and surfaces",
      "Riemannian manifolds",
      "Geodesics",
      "Curvature"
    ],
    connections: ["topology", "analysis", "algebra"]
  }
];

export const intersections: Intersection[] = [
  {
    id: "complex-prime",
    title: "Complex Primes e Riemann",
    description: "Where complex analysis meets prime number theory in one of mathematics' greatest unsolved problems.",
    shortDescription: "Onde números complexos revelam segredos sobre os números primos",
    planetIds: ["complex", "prime"],
    position: { x: 375, y: 150 },
    connection: "The Riemann Hypothesis concerns the distribution of prime numbers and states that all non-trivial zeros of the Riemann zeta function lie on the critical line with real part 1/2 in the complex plane. This connection between complex analysis and prime numbers has profound implications for understanding the distribution of primes.",
    formula: "ζ(s) = ∑(n=1 to ∞) 1/n^s = ∏(p prime) 1/(1-p^(-s))"
  },
  {
    id: "topology-geometry",
    title: "Geometria Diferencial",
    description: "The intersection where the study of shapes meets the study of spaces through differential methods.",
    shortDescription: "Onde formas e espaços se encontram com muito cálculo",
    planetIds: ["topology", "geometry"],
    position: { x: 500, y: -300 },
    connection: "Differential geometry applies calculus to geometric problems, while topology studies properties preserved under continuous transformations. Their intersection includes the study of manifolds, which are spaces that locally resemble Euclidean space but may have complex global structure. Gauss-Bonnet theorem connects the curvature of a surface to its topology.",
    formula: "∫∫M K dA = 2πχ(M)"
  },
  {
    id: "analysis-algebra",
    title: "Análise Funcional",
    description: "Where the continuous world of analysis meets the abstract structures of algebra.",
    shortDescription: "Quando álgebra e análise se unem para estudar espaços infinitos",
    planetIds: ["analysis", "algebra"],
    position: { x: -200, y: 400 },
    connection: "Functional analysis combines techniques from algebra with the limit concepts of analysis, particularly in the study of infinite-dimensional vector spaces. Operator algebra studies algebras of bounded linear operators on Hilbert spaces, with applications in quantum mechanics and representation theory.",
    formula: "||T|| = sup{||Tx|| : ||x|| ≤ 1}"
  },
  {
    id: "complex-analysis",
    title: "Análise Complexa",
    description: "The elegant fusion of complex numbers with the principles of calculus and analysis.",
    shortDescription: "Cálculo com números complexos: mais bonito e mais poderoso!",
    planetIds: ["complex", "analysis"],
    position: { x: 325, y: 25 },
    connection: "Complex analysis extends the concepts of calculus to complex-valued functions. It reveals surprising connections between seemingly different areas of mathematics. A key result is Cauchy's integral formula, which shows that a holomorphic function inside a simple closed contour is determined entirely by its values on the contour.",
    formula: "f(z₀) = (1/2πi) ∮(C) f(z)/(z-z₀) dz"
  },
  {
    id: "algebra-geometry",
    title: "Geometria Algébrica",
    description: "The beautiful marriage of algebraic structures with geometric intuition.",
    shortDescription: "Onde a álgebra encontra a visualização geométrica em perfeita harmonia",
    planetIds: ["algebra", "geometry"],
    position: { x: -425, y: -150 },
    connection: "Algebraic geometry studies geometric objects defined by polynomial equations, combining abstract algebra with geometric visualization. Bezout's theorem, for instance, relates the degree of polynomial equations to the number of intersection points of their corresponding curves.",
    formula: "V(I) = {x ∈ kⁿ | f(x) = 0 for all f ∈ I}"
  }
];
