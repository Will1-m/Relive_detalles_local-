# Relive - Sitio y Herramientas

Este repositorio contiene! todo lo necesario para tu página web de **Relive - Servicio Técnico Electrónico** y los scripts auxiliares:

* **Front-end**: HTML, CSS, JavaScript y/o React.
* **Back-end**: Node.js con Express.
* **Scripts**: Python para crear imágenes de productos automáticamente.

---

## 1. Comenzar rápido

1. **Clona** este repositorio y ve a la carpeta:

   ```bash
   git clone https://github.com/Will1-m/Relive_detalles_local-.git
   cd Relive_detalles_local-
   ```

2. **Instala** las dependencias:

   * Para el **frontend** (dentro de `frontend/`):

     ```bash
     cd frontend
     npm install
     ```
   * Para el **backend** (dentro de `backend/`):

     ```bash
     cd ../backend
     npm install
     ```
   * Para los **scripts Python** (dentro de `scripts/`):

     ```bash
     cd ../scripts
     python -m venv venv        # (opcional)
     # Windows PowerShell:
     .\venv\Scripts\Activate.ps1
     # Linux/Mac:
     source venv/bin/activate
     pip install -r requirements.txt
     ```

---

## 2. Ejecutar el proyecto

* **Servidor (backend)**:

  ```bash
  cd backend
  npm run dev
  ```
* **Página (frontend)**:

  ```bash
  cd frontend
  npm start
  ```
* **Generar imágenes de productos**:

  ```bash
  cd scripts
  # Asume que tienes productos.json en esta carpeta
  python generate_images.py --input productos.json --output img/
  ```

  Las imágenes se guardan en `scripts/img/`.

---

## 3. Organización de carpetas

```
Relive_detalles_local-/
├─ frontend/     # Código del sitio (React o estático)
├─ backend/      # API con Express
├─ scripts/      # Scripts Python y JSON de productos
│  ├─ generate_images.py
│  ├─ requirements.txt
│  └─ productos.json
├─ .gitignore
└─ README.md
```

---

## 4. ¿Quieres ayudar?

1. Haz un **fork** de este repositorio.
2. Crea una **rama** nueva: `git checkout -b mi-cambio`.
3. Haz tus **cambios** y `git commit -m "Explico mi cambio"`.
4. Sube tu rama y abre un **Pull Request**.

---

¡Listo! Con estos pasos tendrás el proyecto funcionando localmente. Si tienes dudas o quieres más detalles, dime y lo vemos juntos.

