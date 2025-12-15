import ErrorHandler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js";
class ValidationError extends Error {}

export const sendReservation = async (req, res, next) => {
    const { firstName, lastName, email, phone, time, date } = req.body;
    if (!firstName || !lastName || !email || !phone || !time || !date) {
        return next(new ErrorHandler("Please fill all the fields", 400));
    }
    try {
        await Reservation.create({firstName, lastName, email, phone, time, date});
        res.status(200).
        json({
            success: true,
            message: "Reservation successful",
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            const ValidationError = Object.values(error.errors).map(
                (err) => err.message);
        }
        return next(new ErrorHandler(ValidationError.join(", "), 400));
    }
    return next(error);
};