const hello = (req, res) => {
  res.status(200).json({ status: 'success', message: 'hello mohammed' })
}

export default hello
