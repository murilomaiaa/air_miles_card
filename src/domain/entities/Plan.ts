import { BaseEntity, BaseEntityProps } from './BaseEntity';

export type PlanPartial = {
  id: string;
  name: string;
};

export type PlanProps = BaseEntityProps & {
  name: string;
};

export class Plan extends BaseEntity {
  private name: string;

  constructor(props: PlanProps) {
    super(props);
    this.name = props.name;
  }

  toPartial(): PlanPartial {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
