import { QuestionModel, AnswerModel } from "../../models";
import { IInitQuestion } from "../../type";

// tslint:disable:max-line-length
export const questions: IInitQuestion[] = [{
    question: new QuestionModel(
      "Quand je quitte mon poste de travail pendant une durée inférieure à 20 minutes",
      "Mettre en veille l'ordinateur demande très peu d'énergie. De plus, la récupération du travail se fait très rapidement. Il est préférable de toujours éteindre l'écran pendant une période d'inactivité"
    ),
    answers: [
      new AnswerModel("J'éteins complètement l'ordinateur et l'écran"),
      new AnswerModel("Je mets l'ordinateur en veille et j'éteins l'écran", true),
      new AnswerModel("Je laisse tout, je ne touche rien")
    ]
  }, {
    question: new QuestionModel(
      "Lorsque je souhaite aller sur un site internet que je visite fréquemment",
      ""
    ),
    answers: [
      new AnswerModel("Je recherche le nom du site sur Google"),
      new AnswerModel("Je créé un favoris sur mon navigateur, puis je l'utiliser pour aller sur le site", true),
      new AnswerModel("J'écris le lien complet du site sur lequel je souhaite me rendre")
    ]
  }, {
    question: new QuestionModel(
      "Lorsque je reçois une newsletter indésirable",
      "Se désabonner de la newsletter est le meilleur moyen pour soulager le serveur de messagerie et ne plus saturer son stockage avec des spams. 99% du temps, un lien pour se désabonner se situe tout en bas de la newsletter"
    ),
    answers: [
      new AnswerModel("Je marque l'émetteur comme indésirable dans le but que ses prochains mails atterrissent directement dans le dossier spam"),
      new AnswerModel("Je supprime directement le mail"),
      new AnswerModel("Je cherche un moyen de me désabonner de la newsletter", true)
    ]
  }, {
    question: new QuestionModel(
      "Quel pourcentage de mails ne sont jamais ouvert",
      "Pour réduire ce nombre, on peut éviter par exemple de s'inscrire à des newsletters, ou plus simple en n'envoyant pas de mails inutiles"
    ),
    answers: [
      new AnswerModel("25%"),
      new AnswerModel("55%"),
      new AnswerModel("80%", true)
    ]
  }, {
    question: new QuestionModel(
      "Qu'elle la meilleure façon de moins impacter l'environement lorsque que je doit archiver de vieux documents de mon ordinateur",
      ""
    ),
    answers: [
      new AnswerModel("Les mettre sur une clé USB", true),
      new AnswerModel("Les mettre sur un Cloud"),
      new AnswerModel("Les imprimer")
    ]
  }
];
