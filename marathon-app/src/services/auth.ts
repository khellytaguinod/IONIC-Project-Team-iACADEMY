import firebase from 'firebase';

export class AuthService {
  public username: string;
  public email: string;


  signup(email: string, password: string, name: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
      user = firebase.auth().currentUser;
      user.updateProfile({displayName: name}).then(() => {
        firebase.database().ref('/users').child(user.uid).set({
          email: user.email,
          name: user.displayName,
          userType: 'user'
        });
      });
    })
  }

  signin(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logout() {
    return firebase.auth().signOut();
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
