// Module imports





const trainNER = async (ner, trainingData) => {
  console.log('NER training...')
  const count = ner.learn(trainingData)
  console.log('Finished NER training.', count)
}





export { trainNER }