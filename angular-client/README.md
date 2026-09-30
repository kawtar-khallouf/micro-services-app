# Client Angular de l'architecture microservices

Cette application fournit une interface web pour consulter et gérer les
clients, les produits et les factures via `gateway-service`.

Les appels HTTP sont envoyés vers `http://localhost:8888` et utilisent les
routes `/CUSTOMER-SERVICE`, `/INVENTORY-SERVICE` et `/BILLING-SERVICE`.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.2.2.

## Serveur de développement

Pour installer les dépendances puis démarrer le serveur de développement :

```bash
npm install
npm start
```

Ouvrir ensuite [http://localhost:4200](http://localhost:4200). Le gateway et
les trois microservices métier doivent être démarrés pour charger les données.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
