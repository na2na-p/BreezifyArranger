// Arrayの利用はeslintで禁止しているので、明示的に利用する際は、エイリアスとして用意したMutableArrayを利用してもらう
declare type MutableArray<T> = Array<T>; // eslint-disable-line
