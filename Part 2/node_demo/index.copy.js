

 function gcd(number1, number2) {
     var remainder = 0;
     do {
         remainder = number1 % number2;
         number1 = number2;
         number2 = remainder;
     } while (remainder !== 0);
     return number1;
 }