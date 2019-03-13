import { QuestionModel, AnswerModel } from "../../models";
import { IInitQuestion } from "../../type";

// tslint:disable:max-line-length
export const questions: IInitQuestion[] = [{
    question: new QuestionModel(
      "Lorsque je quitte mon poste de travail pour une durée inférieure à 20 minutes :",
      "Mettre en veille l'ordinateur demande très peu d'énergie. De plus, la récupération du travail se fait très rapidement. Il est préférable de toujours éteindre l'écran pendant une période d'inactivité"
    ),
    answers: [
      new AnswerModel("J'éteins complètement l'ordinateur et l'écran"),
      new AnswerModel("Je mets l'ordinateur en veille et j'éteins l'écran", true),
      new AnswerModel("Je laisse tout, je ne touche rien")
    ]
  }, {
    question: new QuestionModel(
      "Lorsque je souhaite me rendre sur un site internet que je visite fréquemment :",
      "Les réponses 1 et 3 sont similaires. Dans les deux cas on privilégie le chemin le plus court pour éviter de créer du traffic et de faire travailler les « data centers »."
    ),
    answers: [
      new AnswerModel("Je crée un favoris sur mon navigateur, puis je l'utilise pour aller sur le site", true),
      new AnswerModel("Je recherche le nom du site sur Google"),
      new AnswerModel("J'écris le lien URL complet du site sur lequel je souhaite me rendre", true)
    ]
  }, {
    question: new QuestionModel(
      "Lorsque je reçois une newsletter indésirable :",
      "Se désabonner de la newsletter est le meilleur moyen pour soulager le serveur de messagerie et ne plus saturer son stockage avec des spams. 99% du temps, un lien pour se désabonner se situe tout en bas de la newsletter"
    ),
    answers: [
      new AnswerModel("Je marque l'émetteur comme indésirable dans le but que ses prochains mails atterrissent directement dans le dossier spam"),
      new AnswerModel("Je supprime directement le mail"),
      new AnswerModel("Je cherche un moyen de me désabonner de la newsletter", true)
    ]
  }, {
    question: new QuestionModel(
      "Selon vous, quel est le pourcentage de mail jamais ouvert ?",
      "Pour réduire ce nombre, on peut éviter de s'inscrire inutilement à des newsletters ou n'envoyer des mails que lorsque c'est nécessaire"
    ),
    answers: [
      new AnswerModel("25%"),
      new AnswerModel("55%"),
      new AnswerModel("80%", true)
    ]
  }, {
    question: new QuestionModel(
      "Quelle la meilleure solution pour réduire mon empreinte environnementale lorsque que je dois archiver de vieux documents sur mon ordinateur ?",
      "Les clouds sont des serveurs délocalisées fonctionnant 24/7 afin de rendre les informations disponibles à n'importe quel moment. L'impression, quant à elle, est une des causes de la déforestation. L'usage de l'encre a également un impact sur l'environnement. Il est donc préférable d'utiliser une clé USB."
    ),
    answers: [
      new AnswerModel("Les stocker sur une clé USB", true),
      new AnswerModel("Les stocker sur un Cloud"),
      new AnswerModel("Les imprimer")
    ]
  }, {
    question: new QuestionModel(
      "Lorsque j'ai lu un mail que je ne rouvrirai probablement jamais :",
      "Le simple fait de garder des mails dans sa boîte de réception fait intervenir des serveurs gourmands en énergie. Une fois qu’un mail est lu il est préférable de le supprimer."
    ),
    answers: [
      new AnswerModel("Je le laisse dans ma boîte mail"),
      new AnswerModel("J'archive le mail, cela suffit"),
      new AnswerModel("Je supprime le mail", true)
    ]
  }, {
    question: new QuestionModel(
      "Selon vous, quelle est la meilleure façon de communiquer avec quelqu'un en polluant un minimum :",
      "Les SMS étant transportés par la technologie téléphonique, ils rejettent moins de CO<sub>2</sub>. Contrairement aux mails et aux messageries en ligne qui utilisent internet, ils ont besoin de bien plus de ressources pour transporter et stocker la donnée à long terme."
    ),
    answers: [
      new AnswerModel("Lui envoyer un message avec un service de messagerie (Messenger, WhatsApp, ...)"),
      new AnswerModel("Lui envoyer un SMS", true),
      new AnswerModel("Lui envoyer un mail")
    ]
  }, {
    question: new QuestionModel(
      "Après avoir visité ce site, pensez-vous remanier vos habitudes afin de moins polluer ?",
      ""
    ),
    answers: [
      new AnswerModel("Oui, complétement", true),
      new AnswerModel("En partie, pas complétement", true),
      new AnswerModel("Non, pas du tout", true)
    ]
  }
];
