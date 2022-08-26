//Function wait is used after the collision before showing points and highscores
// ms = 1500 (1,5 sec)
/*
    Makes a program to wait for requested time
    Function wait is used after the collision before showing points and highscores

    @.pre time in ms
    @.post 
*/
export const wait = (ms) => {
    let start = new Date().getTime();
    let end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }