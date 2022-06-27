#include <stdio.h>

void potencia(int* result, int a, int b) {
  *result = 1;
  for (int i = 0; i < b; i++) {
    *result = *result * a;
  }
}

int main() {
  printf("Calculo de Potencia\n\n");

  int result;

  potencia(&result, 2, 10);

  printf("2^10 = %d\n", result);
}