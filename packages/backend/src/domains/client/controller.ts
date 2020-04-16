import { getManager } from 'typeorm';
import { ParameterizedContext as Context } from 'koa';
import { Client } from '@backend/entities/Client';
import { Location } from '@backend/entities/Location';
import { Point } from '@types';

export const get = async (ctx: Context) => {
  const client = await Client.findByToken(ctx.request.body.token);

  ctx.body = { result: client };
};

export const create = async (ctx: Context) => {
  const client = new Client();
  client.token = ctx.request.body.token;
  await client.save();

  ctx.body = { result: client };
};

export const getLocations = async (ctx: Context) => {
  const client = await Client.findByToken(
    ctx.request.body.token,
    { relations: ['locations'] },
  );

  ctx.body = { result: client };
};

export const addLocation = async (ctx: Context) => {
  const body = ctx.request.body as { token: string; locations?: Point[] };
  const client = await Client.findByToken(body.token);
  if (body.locations?.length) {
    const locations = await getManager().save(body.locations.map((coord: Point) => {
      const location = new Location();
      location.coords = coord;
      location.client = client;
      return location;
    }), { reload: true });

    ctx.body = { result: locations };
    return;
  }

  ctx.body = { result: [] };
};
