# AngularWebShop - Ruházati Webshop

Regisztrálni is lehet, vagy belépés : test@gmail.com, Pw: testpw

Fordítási hiba nincs (ng serve kiadásakor nincs hiba) ✅ nincs
Futtatási hiba nincs (böngésző konzol részében nincs hiba) ✅ nincs
Adatmodell definiálása (legalább 4 TypeScript interfész vagy class formájában (ugyanennyi kollekció)) ✅ (User.ts, Product.ts, Order.ts, Cart.ts)
Reszponzív, mobile-first felület (minden adat látható és jól jelenik meg böngészőben is, mobil nézetben is) ✅
Legalább 4, de 2 különböző attribútum direktíva használata ✅ ngModel, ngStyle: Home.component.html, Contact-Form.component.html, Product.component.html
Legalább 4, de 2 különböző beépített vezérlési folyamat használata (if, switch, for) ✅ @if, @for: Home.component.html, Product.component.html...
Adatátadás szülő és gyermek komponensek között (legalább 3 @Input és 3 @Output) ✅ Contact-Form.component.ts, Menu.component.ts
Legalább 10 különböző Material elem helyes használata. ✅ MatTableModule, MatButtonModule, MatCardModule, MatIconModule, MatSnackBar, MatInputModule, MatSelectModule, MatFormFieldModule, MatProgressSpinnerModule, MatCheckBoxModule, MatSideNav, MatListModule...
Legalább 2 saját Pipe osztály írása és használata ✅ message-type.pipe a contact formon, product-filter.pipe a product oldalon
Adatbevitel Angular form-ok segítségével megvalósítva (legalább 4) ✅ signup, login, contact-form, profile
Legalább 2 különböző Lifecycle Hook használata a teljes projektben (értelmes tartalommal, nem üresen) ✅ ngOnInit: product.component.ts, AfterViewInit: signup.component.ts...
CRUD műveletek mindegyike megvalósult legalább a projekt fő entitásához (Promise, Observable használattal) ✅ regisztráció: C, productok lekérése: R, profil szerkesztése: U, orderek visszavonása: D
CRUD műveletek service-ekbe vannak kiszervezve és megfelelő módon injektálva lettek ✅ order.service.ts, product.service.ts, cart.service.ts, user.service.ts, auth.service.ts, contact-form.service.ts
Legalább 4 komplex Firestore lekérdezés megvalósítása (ide tartoznak: where feltétel, rendezés, léptetés, limitálás) ✅ product.service.ts.-ben található függvények stb..
Legalább 4 különböző route a különböző oldalak eléréséhez ✅ /products, /profile, /orders, /contact, /cart...
AuthGuard implementációja ✅ auth.service.ts loginnal
Legalább 2 route levédése azonosítással (AuthGuard) (ahol ennek értelme van, pl.: egy fórum témakör megtekinthető bárki számára, de a regisztrált felhasználó adatai nem) ✅ /orders, /profile...
Szubjektív pontozás a projekt egészére vonatkozólag (mennyire fedi le a projekt a témakört (mennyire kapcsolódik hozzá), mennyi lehet a befektetett energia a projektben) 🙏🏻


This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.3.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

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

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

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
