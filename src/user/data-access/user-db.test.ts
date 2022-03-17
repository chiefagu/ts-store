/* eslint-disable @typescript-eslint/no-explicit-any */
import { userModel } from ".";
import { makeUserDb } from "./user-db";

describe("data repo: user", () => {
  const userDb = makeUserDb(userModel);

  it("finds a user with a given email", async () => {
    const user = {
      _id: "id",
      name: "a name",
      email: "e@m.com",
      password: "password",
    };

    jest.spyOn(userModel, "findOne").mockResolvedValue(user);

    const actual = await userDb.findByEmail(user.email);

    expect(userModel.findOne).toHaveBeenCalledTimes(1);
    expect(userModel.findOne).toHaveBeenCalledWith({ email: user.email });

    expect(actual).toEqual(user);
  });

  it("finds a user with a given id", async () => {
    const user = {
      _id: "id",
      name: "a name",
      email: "e@m.com",
      password: "password",
    };

    jest.spyOn(userModel, "findById").mockResolvedValue(user);

    const actual = await userDb.findById(user._id);

    expect(userModel.findById).toHaveBeenCalledTimes(1);
    expect(userModel.findById).toHaveBeenCalledWith(user._id);

    expect(actual).toEqual(user);
  });

  it("creates a user in the db", async () => {
    const userModel = { create: jest.fn() };
    const userDb = makeUserDb(userModel as any);

    const user = {
      _id: "id",
      name: "a name",
      email: "e@m.com",
      password: "password",
    };

    userModel.create.mockResolvedValueOnce(user);

    const actual = await userDb.insert(user);

    expect(userModel.create).toHaveBeenCalledTimes(1);
    expect(userModel.create).toHaveBeenCalledWith(user);

    expect(actual).toEqual(user);
  });

  it("updates a user's info", async () => {
    const userModel = { findByIdAndUpdate: jest.fn() };
    const userDb = makeUserDb(userModel as any);

    const user = {
      _id: "id",
      name: "a name",
      email: "e@m.com",
      password: "password",
    };

    const update = { ...user, name: "new name" };

    userModel.findByIdAndUpdate.mockResolvedValueOnce(update);

    const actual = await userDb.update(user._id, update);

    expect(userModel.findByIdAndUpdate).toHaveBeenCalledTimes(1);
    expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(
      user._id,
      { $set: update },
      { new: true }
    );

    expect(actual).toEqual(update);
  });

  it("deletes a user's data", async () => {
    const userModel = { findByIdAndRemove: jest.fn() };
    const userDb = makeUserDb(userModel as any);

    const user = {
      _id: "id",
      name: "a name",
      email: "e@m.com",
      password: "password",
    };

    userModel.findByIdAndRemove.mockResolvedValueOnce(user);

    const actual = await userDb.remove(user._id);

    expect(userModel.findByIdAndRemove).toHaveBeenCalledTimes(1);
    expect(userModel.findByIdAndRemove).toHaveBeenCalledWith(user._id);

    expect(actual).toEqual(user);
  });
});
