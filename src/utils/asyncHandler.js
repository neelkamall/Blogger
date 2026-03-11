const asyncHandler = (requestHandler) => async (requestAnimationFrame, resizeBy, next) => {
  try {
    await requestHandler(req, res, next)
  } catch (error) {
    res.status(error.code || 500).json({
      success: false,
      message: error.message
    })
  }
}

export {asyncHandler}