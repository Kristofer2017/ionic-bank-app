<template>
    <transition name="fade">
      <ion-card class="mt-4 tarjeta">
        <ion-card-header>
          <ion-card-title>Pago manual</ion-card-title>
          <ion-card-subtitle>Ingresa los detalles del pago</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-item>
            <ion-label position="floating">Monto ($)</ion-label>
            <ion-input type="number" placeholder="Ejemplo: 25.00"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="floating">Concepto</ion-label>
            <ion-textarea placeholder="Ejemplo: Recarga saldo, pago parcial..." rows="2"></ion-textarea>
          </ion-item>

          <ion-button expand="block" class="mt-4">
            Confirmar pago manual
          </ion-button>
        </ion-card-content>
      </ion-card>
    </transition>
</template>