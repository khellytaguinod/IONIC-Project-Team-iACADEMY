import firebase from 'firebase';

export class AuthService {
  public username: string;
  public email: string;

  signup(email: string, password: string, name: string){
    return firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(newUser => {
      newUser.updateProfile({
        displayName: name
      })
      firebase.database()
      .ref('/userProfile')
      .child(newUser.uid)
      .set({
        email: email,
        name: name
      });
    })
  }

  signin(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logout() {
    firebase.auth().signOut();
  }

  editUser(displayName: string, photoURL: string) {
    let user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: displayName,
      photoURL: photoURL
    })
  }

  updateUserEmail(email: string) {
    let user = firebase.auth().currentUser;
    return user.updateEmail(email);
  }

  getUserDetails() {
    let user = firebase.auth().currentUser;
    if (user) {
      this.username = user.displayName;
      this.email = user.email;
    }
  }
}
