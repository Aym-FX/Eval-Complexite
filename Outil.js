// ---------- Code que vous nous aviez montré en cours ---------- \\

/**
 * Classe Benchmark pour mesurer et comparer les performances de fonctions.
 * 
 * Exemple d'utilisation :
 * const benchmark = new Benchmark(1000); // 1000 itérations
 * benchmark.addTest(fibonacciDummy, [30]); // Ajouter une fonction à tester
 * benchmark.addTest(fibonacciOptimize, [30]); // Ajouter une autre fonction
 * await benchmark.run(); // Lancer les tests
 */
class Benchmark {
    /**
     * Constructeur de la classe Benchmark.
     * @param {number} iterations - Nombre d'itérations pour chaque test.
     */
    constructor(iterations) {
      this.tests = [];
      this.iterations = iterations;
    }
  
    /**
     * Ajoute une fonction à tester avec ses paramètres.
     * @param {Function} func - La fonction à tester.
     * @param {Array} params - Les paramètres à passer à la fonction.
     */
    addTest(func, params) {
      this.tests.push({ func, params });
    }
  
    /**
     * Exécute tous les tests de manière asynchrone et affiche les résultats.
     * - Affiche les fonctions à tester.
     * - Calcule et affiche le temps moyen d'exécution pour chaque fonction.
     * - Identifie et affiche la fonction la plus rapide et la plus lente.
     * @returns {Promise<void>}
     */
    async run() {
      const results = [];
      console.log(`\nNombre d'iteration ${this.iterations}` );
      
      // Afficher les fonctions à tester
      console.log("Fonctions à tester :");
      this.tests.forEach((test, index) => {
        console.log(`- Test ${index + 1}: ${test.func.name}`);
      });
      console.log("-------------------------------------" );
  
      for (const [index, test] of this.tests.entries()) {
        const { func, params } = test;
        const promises = [];
  
        for (let i = 0; i < this.iterations; i++) {
          promises.push(
            new Promise((resolve) => {
              const start = performance.now();
              func(...params);
              const end = performance.now();
              resolve(end - start);
            })
          );
        }
  
        const times = await Promise.all(promises);
        const totalTime = times.reduce((acc, time) => acc + time, 0);
        const averageTime = totalTime / this.iterations;
  
        console.log(`Test ${index + 1} - ${func.name}: Temps moyen d'exécution = ${averageTime.toFixed(4)} ms`);
        results.push({ name: func.name, averageTime });
      }
      
      console.log("-------------------------------------" );
  
      // Trouver le plus rapide et le plus lent
      const fastest = results.reduce((prev, curr) => 
        (curr.averageTime < prev.averageTime) ? curr : prev
      );
      const slowest = results.reduce((prev, curr) => 
        (curr.averageTime > prev.averageTime) ? curr : prev
      );
  
      console.log(`Le plus rapide : ${fastest.name} (${fastest.averageTime.toFixed(4)} ms)`);
      console.log(`Le plus lent : ${slowest.name} (${slowest.averageTime.toFixed(4)} ms)`);
    }
  }
  
  // Exportez la classe pour qu'elle puisse être importée
  module.exports = { Benchmark };
  
  /* Exemple d'utilisation
  let n = 40
  console.log("n = " + n);
  
  Exemple d'utilisation
  const benchmark = new Benchmark(6);
  
  Ajout des fonctions à tester
  benchmark.addTest(fibonacciDummy, [n]);
  benchmark.addTest(fibonacciOptimize, [n]);
  
  Lancement des tests
  benchmark.run(); 
  */