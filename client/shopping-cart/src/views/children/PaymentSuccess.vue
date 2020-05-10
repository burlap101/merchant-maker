<template>
  <div class="container mt-dual-navbar">
    <div class="row">
      <div class="col">
        <h3 class="mt-5">Booking Successful</h3>

        <p class="mt-5">
        Receipt No: <strong> {{response.receipt_number}}</strong>
        </p>
        <p class = "mt-3">
        Thankyou for your booking. A receipt has been emailed to <strong>{{response.receipt_email}}</strong>
        <br /> We will be in contact with you shortly to confirm the course and student details.
        </p>
        <p class="mt-5">
          <a href="{% url 'home' %}">Return home</a>
        <p>
      </div>
    </div>
  </div>
</template>