var o_ = Object.defineProperty,
  s_ = Object.defineProperties;
var a_ = Object.getOwnPropertyDescriptors;
var Lo = Object.getOwnPropertySymbols;
var ch = Object.prototype.hasOwnProperty,
  uh = Object.prototype.propertyIsEnumerable;
var lh = (e, n, t) =>
    n in e
      ? o_(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t })
      : (e[n] = t),
  w = (e, n) => {
    for (var t in (n ||= {})) ch.call(n, t) && lh(e, t, n[t]);
    if (Lo) for (var t of Lo(n)) uh.call(n, t) && lh(e, t, n[t]);
    return e;
  },
  q = (e, n) => s_(e, a_(n));
var Wl = (e, n) => {
  var t = {};
  for (var r in e) ch.call(e, r) && n.indexOf(r) < 0 && (t[r] = e[r]);
  if (e != null && Lo)
    for (var r of Lo(e)) n.indexOf(r) < 0 && uh.call(e, r) && (t[r] = e[r]);
  return t;
};
var Di = (e, n, t) =>
  new Promise((r, i) => {
    var o = (l) => {
        try {
          a(t.next(l));
        } catch (c) {
          i(c);
        }
      },
      s = (l) => {
        try {
          a(t.throw(l));
        } catch (c) {
          i(c);
        }
      },
      a = (l) => (l.done ? r(l.value) : Promise.resolve(l.value).then(o, s));
    a((t = t.apply(e, n)).next());
  });
function Yl(e, n) {
  return Object.is(e, n);
}
var _e = null,
  Vo = !1,
  Jl = 1,
  We = Symbol("SIGNAL");
function Y(e) {
  let n = _e;
  return (_e = e), n;
}
function dh() {
  return _e;
}
var Ei = {
  version: 0,
  lastCleanEpoch: 0,
  dirty: !1,
  producerNode: void 0,
  producerLastReadVersion: void 0,
  producerIndexOfThis: void 0,
  nextProducerIndex: 0,
  liveConsumerNode: void 0,
  liveConsumerIndexOfThis: void 0,
  consumerAllowSignalWrites: !1,
  consumerIsAlwaysLive: !1,
  producerMustRecompute: () => !1,
  producerRecomputeValue: () => {},
  consumerMarkedDirty: () => {},
  consumerOnSignalRead: () => {},
};
function Bo(e) {
  if (Vo) throw new Error("");
  if (_e === null) return;
  _e.consumerOnSignalRead(e);
  let n = _e.nextProducerIndex++;
  if (
    (Ho(_e), n < _e.producerNode.length && _e.producerNode[n] !== e && _i(_e))
  ) {
    let t = _e.producerNode[n];
    $o(t, _e.producerIndexOfThis[n]);
  }
  _e.producerNode[n] !== e &&
    ((_e.producerNode[n] = e),
    (_e.producerIndexOfThis[n] = _i(_e) ? ph(e, _e, n) : 0)),
    (_e.producerLastReadVersion[n] = e.version);
}
function l_() {
  Jl++;
}
function Xl(e) {
  if (!(_i(e) && !e.dirty) && !(!e.dirty && e.lastCleanEpoch === Jl)) {
    if (!e.producerMustRecompute(e) && !tc(e)) {
      Kl(e);
      return;
    }
    e.producerRecomputeValue(e), Kl(e);
  }
}
function fh(e) {
  if (e.liveConsumerNode === void 0) return;
  let n = Vo;
  Vo = !0;
  try {
    for (let t of e.liveConsumerNode) t.dirty || c_(t);
  } finally {
    Vo = n;
  }
}
function hh() {
  return _e?.consumerAllowSignalWrites !== !1;
}
function c_(e) {
  (e.dirty = !0), fh(e), e.consumerMarkedDirty?.(e);
}
function Kl(e) {
  (e.dirty = !1), (e.lastCleanEpoch = Jl);
}
function Uo(e) {
  return e && (e.nextProducerIndex = 0), Y(e);
}
function ec(e, n) {
  if (
    (Y(n),
    !(
      !e ||
      e.producerNode === void 0 ||
      e.producerIndexOfThis === void 0 ||
      e.producerLastReadVersion === void 0
    ))
  ) {
    if (_i(e))
      for (let t = e.nextProducerIndex; t < e.producerNode.length; t++)
        $o(e.producerNode[t], e.producerIndexOfThis[t]);
    for (; e.producerNode.length > e.nextProducerIndex; )
      e.producerNode.pop(),
        e.producerLastReadVersion.pop(),
        e.producerIndexOfThis.pop();
  }
}
function tc(e) {
  Ho(e);
  for (let n = 0; n < e.producerNode.length; n++) {
    let t = e.producerNode[n],
      r = e.producerLastReadVersion[n];
    if (r !== t.version || (Xl(t), r !== t.version)) return !0;
  }
  return !1;
}
function nc(e) {
  if ((Ho(e), _i(e)))
    for (let n = 0; n < e.producerNode.length; n++)
      $o(e.producerNode[n], e.producerIndexOfThis[n]);
  (e.producerNode.length =
    e.producerLastReadVersion.length =
    e.producerIndexOfThis.length =
      0),
    e.liveConsumerNode &&
      (e.liveConsumerNode.length = e.liveConsumerIndexOfThis.length = 0);
}
function ph(e, n, t) {
  if ((gh(e), e.liveConsumerNode.length === 0 && mh(e)))
    for (let r = 0; r < e.producerNode.length; r++)
      e.producerIndexOfThis[r] = ph(e.producerNode[r], e, r);
  return e.liveConsumerIndexOfThis.push(t), e.liveConsumerNode.push(n) - 1;
}
function $o(e, n) {
  if ((gh(e), e.liveConsumerNode.length === 1 && mh(e)))
    for (let r = 0; r < e.producerNode.length; r++)
      $o(e.producerNode[r], e.producerIndexOfThis[r]);
  let t = e.liveConsumerNode.length - 1;
  if (
    ((e.liveConsumerNode[n] = e.liveConsumerNode[t]),
    (e.liveConsumerIndexOfThis[n] = e.liveConsumerIndexOfThis[t]),
    e.liveConsumerNode.length--,
    e.liveConsumerIndexOfThis.length--,
    n < e.liveConsumerNode.length)
  ) {
    let r = e.liveConsumerIndexOfThis[n],
      i = e.liveConsumerNode[n];
    Ho(i), (i.producerIndexOfThis[r] = n);
  }
}
function _i(e) {
  return e.consumerIsAlwaysLive || (e?.liveConsumerNode?.length ?? 0) > 0;
}
function Ho(e) {
  (e.producerNode ??= []),
    (e.producerIndexOfThis ??= []),
    (e.producerLastReadVersion ??= []);
}
function gh(e) {
  (e.liveConsumerNode ??= []), (e.liveConsumerIndexOfThis ??= []);
}
function mh(e) {
  return e.producerNode !== void 0;
}
function yh(e) {
  let n = Object.create(u_);
  n.computation = e;
  let t = () => {
    if ((Xl(n), Bo(n), n.value === jo)) throw n.error;
    return n.value;
  };
  return (t[We] = n), t;
}
var Ql = Symbol("UNSET"),
  Zl = Symbol("COMPUTING"),
  jo = Symbol("ERRORED"),
  u_ = q(w({}, Ei), {
    value: Ql,
    dirty: !0,
    error: null,
    equal: Yl,
    producerMustRecompute(e) {
      return e.value === Ql || e.value === Zl;
    },
    producerRecomputeValue(e) {
      if (e.value === Zl) throw new Error("Detected cycle in computations.");
      let n = e.value;
      e.value = Zl;
      let t = Uo(e),
        r;
      try {
        r = e.computation();
      } catch (i) {
        (r = jo), (e.error = i);
      } finally {
        ec(e, t);
      }
      if (n !== Ql && n !== jo && r !== jo && e.equal(n, r)) {
        e.value = n;
        return;
      }
      (e.value = r), e.version++;
    },
  });
function d_() {
  throw new Error();
}
var vh = d_;
function Dh() {
  vh();
}
function _h(e) {
  vh = e;
}
var f_ = null;
function Eh(e) {
  let n = Object.create(rc);
  n.value = e;
  let t = () => (Bo(n), n.value);
  return (t[We] = n), t;
}
function zo(e, n) {
  hh() || Dh(), e.equal(e.value, n) || ((e.value = n), h_(e));
}
function wh(e, n) {
  hh() || Dh(), zo(e, n(e.value));
}
var rc = q(w({}, Ei), { equal: Yl, value: void 0 });
function h_(e) {
  e.version++, l_(), fh(e), f_?.();
}
function k(e) {
  return typeof e == "function";
}
function gr(e) {
  let t = e((r) => {
    Error.call(r), (r.stack = new Error().stack);
  });
  return (
    (t.prototype = Object.create(Error.prototype)),
    (t.prototype.constructor = t),
    t
  );
}
var Go = gr(
  (e) =>
    function (t) {
      e(this),
        (this.message = t
          ? `${t.length} errors occurred during unsubscription:
${t.map((r, i) => `${i + 1}) ${r.toString()}`).join(`
  `)}`
          : ""),
        (this.name = "UnsubscriptionError"),
        (this.errors = t);
    }
);
function wi(e, n) {
  if (e) {
    let t = e.indexOf(n);
    0 <= t && e.splice(t, 1);
  }
}
var me = class e {
  constructor(n) {
    (this.initialTeardown = n),
      (this.closed = !1),
      (this._parentage = null),
      (this._finalizers = null);
  }
  unsubscribe() {
    let n;
    if (!this.closed) {
      this.closed = !0;
      let { _parentage: t } = this;
      if (t)
        if (((this._parentage = null), Array.isArray(t)))
          for (let o of t) o.remove(this);
        else t.remove(this);
      let { initialTeardown: r } = this;
      if (k(r))
        try {
          r();
        } catch (o) {
          n = o instanceof Go ? o.errors : [o];
        }
      let { _finalizers: i } = this;
      if (i) {
        this._finalizers = null;
        for (let o of i)
          try {
            Ch(o);
          } catch (s) {
            (n = n ?? []),
              s instanceof Go ? (n = [...n, ...s.errors]) : n.push(s);
          }
      }
      if (n) throw new Go(n);
    }
  }
  add(n) {
    var t;
    if (n && n !== this)
      if (this.closed) Ch(n);
      else {
        if (n instanceof e) {
          if (n.closed || n._hasParent(this)) return;
          n._addParent(this);
        }
        (this._finalizers =
          (t = this._finalizers) !== null && t !== void 0 ? t : []).push(n);
      }
  }
  _hasParent(n) {
    let { _parentage: t } = this;
    return t === n || (Array.isArray(t) && t.includes(n));
  }
  _addParent(n) {
    let { _parentage: t } = this;
    this._parentage = Array.isArray(t) ? (t.push(n), t) : t ? [t, n] : n;
  }
  _removeParent(n) {
    let { _parentage: t } = this;
    t === n ? (this._parentage = null) : Array.isArray(t) && wi(t, n);
  }
  remove(n) {
    let { _finalizers: t } = this;
    t && wi(t, n), n instanceof e && n._removeParent(this);
  }
};
me.EMPTY = (() => {
  let e = new me();
  return (e.closed = !0), e;
})();
var ic = me.EMPTY;
function qo(e) {
  return (
    e instanceof me ||
    (e && "closed" in e && k(e.remove) && k(e.add) && k(e.unsubscribe))
  );
}
function Ch(e) {
  k(e) ? e() : e.unsubscribe();
}
var pt = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1,
};
var mr = {
  setTimeout(e, n, ...t) {
    let { delegate: r } = mr;
    return r?.setTimeout ? r.setTimeout(e, n, ...t) : setTimeout(e, n, ...t);
  },
  clearTimeout(e) {
    let { delegate: n } = mr;
    return (n?.clearTimeout || clearTimeout)(e);
  },
  delegate: void 0,
};
function Wo(e) {
  mr.setTimeout(() => {
    let { onUnhandledError: n } = pt;
    if (n) n(e);
    else throw e;
  });
}
function Ci() {}
var bh = oc("C", void 0, void 0);
function Ih(e) {
  return oc("E", void 0, e);
}
function Sh(e) {
  return oc("N", e, void 0);
}
function oc(e, n, t) {
  return { kind: e, value: n, error: t };
}
var Bn = null;
function yr(e) {
  if (pt.useDeprecatedSynchronousErrorHandling) {
    let n = !Bn;
    if ((n && (Bn = { errorThrown: !1, error: null }), e(), n)) {
      let { errorThrown: t, error: r } = Bn;
      if (((Bn = null), t)) throw r;
    }
  } else e();
}
function Mh(e) {
  pt.useDeprecatedSynchronousErrorHandling &&
    Bn &&
    ((Bn.errorThrown = !0), (Bn.error = e));
}
var Un = class extends me {
    constructor(n) {
      super(),
        (this.isStopped = !1),
        n
          ? ((this.destination = n), qo(n) && n.add(this))
          : (this.destination = m_);
    }
    static create(n, t, r) {
      return new vr(n, t, r);
    }
    next(n) {
      this.isStopped ? ac(Sh(n), this) : this._next(n);
    }
    error(n) {
      this.isStopped
        ? ac(Ih(n), this)
        : ((this.isStopped = !0), this._error(n));
    }
    complete() {
      this.isStopped ? ac(bh, this) : ((this.isStopped = !0), this._complete());
    }
    unsubscribe() {
      this.closed ||
        ((this.isStopped = !0), super.unsubscribe(), (this.destination = null));
    }
    _next(n) {
      this.destination.next(n);
    }
    _error(n) {
      try {
        this.destination.error(n);
      } finally {
        this.unsubscribe();
      }
    }
    _complete() {
      try {
        this.destination.complete();
      } finally {
        this.unsubscribe();
      }
    }
  },
  p_ = Function.prototype.bind;
function sc(e, n) {
  return p_.call(e, n);
}
var lc = class {
    constructor(n) {
      this.partialObserver = n;
    }
    next(n) {
      let { partialObserver: t } = this;
      if (t.next)
        try {
          t.next(n);
        } catch (r) {
          Qo(r);
        }
    }
    error(n) {
      let { partialObserver: t } = this;
      if (t.error)
        try {
          t.error(n);
        } catch (r) {
          Qo(r);
        }
      else Qo(n);
    }
    complete() {
      let { partialObserver: n } = this;
      if (n.complete)
        try {
          n.complete();
        } catch (t) {
          Qo(t);
        }
    }
  },
  vr = class extends Un {
    constructor(n, t, r) {
      super();
      let i;
      if (k(n) || !n)
        i = { next: n ?? void 0, error: t ?? void 0, complete: r ?? void 0 };
      else {
        let o;
        this && pt.useDeprecatedNextContext
          ? ((o = Object.create(n)),
            (o.unsubscribe = () => this.unsubscribe()),
            (i = {
              next: n.next && sc(n.next, o),
              error: n.error && sc(n.error, o),
              complete: n.complete && sc(n.complete, o),
            }))
          : (i = n);
      }
      this.destination = new lc(i);
    }
  };
function Qo(e) {
  pt.useDeprecatedSynchronousErrorHandling ? Mh(e) : Wo(e);
}
function g_(e) {
  throw e;
}
function ac(e, n) {
  let { onStoppedNotification: t } = pt;
  t && mr.setTimeout(() => t(e, n));
}
var m_ = { closed: !0, next: Ci, error: g_, complete: Ci };
var Dr = (typeof Symbol == "function" && Symbol.observable) || "@@observable";
function Qe(e) {
  return e;
}
function cc(...e) {
  return uc(e);
}
function uc(e) {
  return e.length === 0
    ? Qe
    : e.length === 1
    ? e[0]
    : function (t) {
        return e.reduce((r, i) => i(r), t);
      };
}
var Q = (() => {
  class e {
    constructor(t) {
      t && (this._subscribe = t);
    }
    lift(t) {
      let r = new e();
      return (r.source = this), (r.operator = t), r;
    }
    subscribe(t, r, i) {
      let o = v_(t) ? t : new vr(t, r, i);
      return (
        yr(() => {
          let { operator: s, source: a } = this;
          o.add(
            s ? s.call(o, a) : a ? this._subscribe(o) : this._trySubscribe(o)
          );
        }),
        o
      );
    }
    _trySubscribe(t) {
      try {
        return this._subscribe(t);
      } catch (r) {
        t.error(r);
      }
    }
    forEach(t, r) {
      return (
        (r = Th(r)),
        new r((i, o) => {
          let s = new vr({
            next: (a) => {
              try {
                t(a);
              } catch (l) {
                o(l), s.unsubscribe();
              }
            },
            error: o,
            complete: i,
          });
          this.subscribe(s);
        })
      );
    }
    _subscribe(t) {
      var r;
      return (r = this.source) === null || r === void 0
        ? void 0
        : r.subscribe(t);
    }
    [Dr]() {
      return this;
    }
    pipe(...t) {
      return uc(t)(this);
    }
    toPromise(t) {
      return (
        (t = Th(t)),
        new t((r, i) => {
          let o;
          this.subscribe(
            (s) => (o = s),
            (s) => i(s),
            () => r(o)
          );
        })
      );
    }
  }
  return (e.create = (n) => new e(n)), e;
})();
function Th(e) {
  var n;
  return (n = e ?? pt.Promise) !== null && n !== void 0 ? n : Promise;
}
function y_(e) {
  return e && k(e.next) && k(e.error) && k(e.complete);
}
function v_(e) {
  return (e && e instanceof Un) || (y_(e) && qo(e));
}
function dc(e) {
  return k(e?.lift);
}
function Z(e) {
  return (n) => {
    if (dc(n))
      return n.lift(function (t) {
        try {
          return e(t, this);
        } catch (r) {
          this.error(r);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function W(e, n, t, r, i) {
  return new fc(e, n, t, r, i);
}
var fc = class extends Un {
  constructor(n, t, r, i, o, s) {
    super(n),
      (this.onFinalize = o),
      (this.shouldUnsubscribe = s),
      (this._next = t
        ? function (a) {
            try {
              t(a);
            } catch (l) {
              n.error(l);
            }
          }
        : super._next),
      (this._error = i
        ? function (a) {
            try {
              i(a);
            } catch (l) {
              n.error(l);
            } finally {
              this.unsubscribe();
            }
          }
        : super._error),
      (this._complete = r
        ? function () {
            try {
              r();
            } catch (a) {
              n.error(a);
            } finally {
              this.unsubscribe();
            }
          }
        : super._complete);
  }
  unsubscribe() {
    var n;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      let { closed: t } = this;
      super.unsubscribe(),
        !t && ((n = this.onFinalize) === null || n === void 0 || n.call(this));
    }
  }
};
function _r() {
  return Z((e, n) => {
    let t = null;
    e._refCount++;
    let r = W(n, void 0, void 0, void 0, () => {
      if (!e || e._refCount <= 0 || 0 < --e._refCount) {
        t = null;
        return;
      }
      let i = e._connection,
        o = t;
      (t = null), i && (!o || i === o) && i.unsubscribe(), n.unsubscribe();
    });
    e.subscribe(r), r.closed || (t = e.connect());
  });
}
var Er = class extends Q {
  constructor(n, t) {
    super(),
      (this.source = n),
      (this.subjectFactory = t),
      (this._subject = null),
      (this._refCount = 0),
      (this._connection = null),
      dc(n) && (this.lift = n.lift);
  }
  _subscribe(n) {
    return this.getSubject().subscribe(n);
  }
  getSubject() {
    let n = this._subject;
    return (
      (!n || n.isStopped) && (this._subject = this.subjectFactory()),
      this._subject
    );
  }
  _teardown() {
    this._refCount = 0;
    let { _connection: n } = this;
    (this._subject = this._connection = null), n?.unsubscribe();
  }
  connect() {
    let n = this._connection;
    if (!n) {
      n = this._connection = new me();
      let t = this.getSubject();
      n.add(
        this.source.subscribe(
          W(
            t,
            void 0,
            () => {
              this._teardown(), t.complete();
            },
            (r) => {
              this._teardown(), t.error(r);
            },
            () => this._teardown()
          )
        )
      ),
        n.closed && ((this._connection = null), (n = me.EMPTY));
    }
    return n;
  }
  refCount() {
    return _r()(this);
  }
};
var Ah = gr(
  (e) =>
    function () {
      e(this),
        (this.name = "ObjectUnsubscribedError"),
        (this.message = "object unsubscribed");
    }
);
var Ee = (() => {
    class e extends Q {
      constructor() {
        super(),
          (this.closed = !1),
          (this.currentObservers = null),
          (this.observers = []),
          (this.isStopped = !1),
          (this.hasError = !1),
          (this.thrownError = null);
      }
      lift(t) {
        let r = new Zo(this, this);
        return (r.operator = t), r;
      }
      _throwIfClosed() {
        if (this.closed) throw new Ah();
      }
      next(t) {
        yr(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.currentObservers ||
              (this.currentObservers = Array.from(this.observers));
            for (let r of this.currentObservers) r.next(t);
          }
        });
      }
      error(t) {
        yr(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            (this.hasError = this.isStopped = !0), (this.thrownError = t);
            let { observers: r } = this;
            for (; r.length; ) r.shift().error(t);
          }
        });
      }
      complete() {
        yr(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.isStopped = !0;
            let { observers: t } = this;
            for (; t.length; ) t.shift().complete();
          }
        });
      }
      unsubscribe() {
        (this.isStopped = this.closed = !0),
          (this.observers = this.currentObservers = null);
      }
      get observed() {
        var t;
        return (
          ((t = this.observers) === null || t === void 0 ? void 0 : t.length) >
          0
        );
      }
      _trySubscribe(t) {
        return this._throwIfClosed(), super._trySubscribe(t);
      }
      _subscribe(t) {
        return (
          this._throwIfClosed(),
          this._checkFinalizedStatuses(t),
          this._innerSubscribe(t)
        );
      }
      _innerSubscribe(t) {
        let { hasError: r, isStopped: i, observers: o } = this;
        return r || i
          ? ic
          : ((this.currentObservers = null),
            o.push(t),
            new me(() => {
              (this.currentObservers = null), wi(o, t);
            }));
      }
      _checkFinalizedStatuses(t) {
        let { hasError: r, thrownError: i, isStopped: o } = this;
        r ? t.error(i) : o && t.complete();
      }
      asObservable() {
        let t = new Q();
        return (t.source = this), t;
      }
    }
    return (e.create = (n, t) => new Zo(n, t)), e;
  })(),
  Zo = class extends Ee {
    constructor(n, t) {
      super(), (this.destination = n), (this.source = t);
    }
    next(n) {
      var t, r;
      (r =
        (t = this.destination) === null || t === void 0 ? void 0 : t.next) ===
        null ||
        r === void 0 ||
        r.call(t, n);
    }
    error(n) {
      var t, r;
      (r =
        (t = this.destination) === null || t === void 0 ? void 0 : t.error) ===
        null ||
        r === void 0 ||
        r.call(t, n);
    }
    complete() {
      var n, t;
      (t =
        (n = this.destination) === null || n === void 0
          ? void 0
          : n.complete) === null ||
        t === void 0 ||
        t.call(n);
    }
    _subscribe(n) {
      var t, r;
      return (r =
        (t = this.source) === null || t === void 0
          ? void 0
          : t.subscribe(n)) !== null && r !== void 0
        ? r
        : ic;
    }
  };
var Ae = class extends Ee {
  constructor(n) {
    super(), (this._value = n);
  }
  get value() {
    return this.getValue();
  }
  _subscribe(n) {
    let t = super._subscribe(n);
    return !t.closed && n.next(this._value), t;
  }
  getValue() {
    let { hasError: n, thrownError: t, _value: r } = this;
    if (n) throw t;
    return this._throwIfClosed(), r;
  }
  next(n) {
    super.next((this._value = n));
  }
};
var Ze = new Q((e) => e.complete());
function Nh(e) {
  return e && k(e.schedule);
}
function xh(e) {
  return e[e.length - 1];
}
function Ko(e) {
  return k(xh(e)) ? e.pop() : void 0;
}
function hn(e) {
  return Nh(xh(e)) ? e.pop() : void 0;
}
function Ph(e, n, t, r) {
  function i(o) {
    return o instanceof t
      ? o
      : new t(function (s) {
          s(o);
        });
  }
  return new (t || (t = Promise))(function (o, s) {
    function a(u) {
      try {
        c(r.next(u));
      } catch (d) {
        s(d);
      }
    }
    function l(u) {
      try {
        c(r.throw(u));
      } catch (d) {
        s(d);
      }
    }
    function c(u) {
      u.done ? o(u.value) : i(u.value).then(a, l);
    }
    c((r = r.apply(e, n || [])).next());
  });
}
function Rh(e) {
  var n = typeof Symbol == "function" && Symbol.iterator,
    t = n && e[n],
    r = 0;
  if (t) return t.call(e);
  if (e && typeof e.length == "number")
    return {
      next: function () {
        return (
          e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }
        );
      },
    };
  throw new TypeError(
    n ? "Object is not iterable." : "Symbol.iterator is not defined."
  );
}
function $n(e) {
  return this instanceof $n ? ((this.v = e), this) : new $n(e);
}
function Oh(e, n, t) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var r = t.apply(e, n || []),
    i,
    o = [];
  return (
    (i = Object.create(
      (typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype
    )),
    a("next"),
    a("throw"),
    a("return", s),
    (i[Symbol.asyncIterator] = function () {
      return this;
    }),
    i
  );
  function s(f) {
    return function (m) {
      return Promise.resolve(m).then(f, d);
    };
  }
  function a(f, m) {
    r[f] &&
      ((i[f] = function (y) {
        return new Promise(function (E, S) {
          o.push([f, y, E, S]) > 1 || l(f, y);
        });
      }),
      m && (i[f] = m(i[f])));
  }
  function l(f, m) {
    try {
      c(r[f](m));
    } catch (y) {
      h(o[0][3], y);
    }
  }
  function c(f) {
    f.value instanceof $n
      ? Promise.resolve(f.value.v).then(u, d)
      : h(o[0][2], f);
  }
  function u(f) {
    l("next", f);
  }
  function d(f) {
    l("throw", f);
  }
  function h(f, m) {
    f(m), o.shift(), o.length && l(o[0][0], o[0][1]);
  }
}
function Fh(e) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var n = e[Symbol.asyncIterator],
    t;
  return n
    ? n.call(e)
    : ((e = typeof Rh == "function" ? Rh(e) : e[Symbol.iterator]()),
      (t = {}),
      r("next"),
      r("throw"),
      r("return"),
      (t[Symbol.asyncIterator] = function () {
        return this;
      }),
      t);
  function r(o) {
    t[o] =
      e[o] &&
      function (s) {
        return new Promise(function (a, l) {
          (s = e[o](s)), i(a, l, s.done, s.value);
        });
      };
  }
  function i(o, s, a, l) {
    Promise.resolve(l).then(function (c) {
      o({ value: c, done: a });
    }, s);
  }
}
var Yo = (e) => e && typeof e.length == "number" && typeof e != "function";
function Jo(e) {
  return k(e?.then);
}
function Xo(e) {
  return k(e[Dr]);
}
function es(e) {
  return Symbol.asyncIterator && k(e?.[Symbol.asyncIterator]);
}
function ts(e) {
  return new TypeError(
    `You provided ${
      e !== null && typeof e == "object" ? "an invalid object" : `'${e}'`
    } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
  );
}
function D_() {
  return typeof Symbol != "function" || !Symbol.iterator
    ? "@@iterator"
    : Symbol.iterator;
}
var ns = D_();
function rs(e) {
  return k(e?.[ns]);
}
function is(e) {
  return Oh(this, arguments, function* () {
    let t = e.getReader();
    try {
      for (;;) {
        let { value: r, done: i } = yield $n(t.read());
        if (i) return yield $n(void 0);
        yield yield $n(r);
      }
    } finally {
      t.releaseLock();
    }
  });
}
function os(e) {
  return k(e?.getReader);
}
function ye(e) {
  if (e instanceof Q) return e;
  if (e != null) {
    if (Xo(e)) return __(e);
    if (Yo(e)) return E_(e);
    if (Jo(e)) return w_(e);
    if (es(e)) return kh(e);
    if (rs(e)) return C_(e);
    if (os(e)) return b_(e);
  }
  throw ts(e);
}
function __(e) {
  return new Q((n) => {
    let t = e[Dr]();
    if (k(t.subscribe)) return t.subscribe(n);
    throw new TypeError(
      "Provided object does not correctly implement Symbol.observable"
    );
  });
}
function E_(e) {
  return new Q((n) => {
    for (let t = 0; t < e.length && !n.closed; t++) n.next(e[t]);
    n.complete();
  });
}
function w_(e) {
  return new Q((n) => {
    e.then(
      (t) => {
        n.closed || (n.next(t), n.complete());
      },
      (t) => n.error(t)
    ).then(null, Wo);
  });
}
function C_(e) {
  return new Q((n) => {
    for (let t of e) if ((n.next(t), n.closed)) return;
    n.complete();
  });
}
function kh(e) {
  return new Q((n) => {
    I_(e, n).catch((t) => n.error(t));
  });
}
function b_(e) {
  return kh(is(e));
}
function I_(e, n) {
  var t, r, i, o;
  return Ph(this, void 0, void 0, function* () {
    try {
      for (t = Fh(e); (r = yield t.next()), !r.done; ) {
        let s = r.value;
        if ((n.next(s), n.closed)) return;
      }
    } catch (s) {
      i = { error: s };
    } finally {
      try {
        r && !r.done && (o = t.return) && (yield o.call(t));
      } finally {
        if (i) throw i.error;
      }
    }
    n.complete();
  });
}
function Ve(e, n, t, r = 0, i = !1) {
  let o = n.schedule(function () {
    t(), i ? e.add(this.schedule(null, r)) : this.unsubscribe();
  }, r);
  if ((e.add(o), !i)) return o;
}
function ss(e, n = 0) {
  return Z((t, r) => {
    t.subscribe(
      W(
        r,
        (i) => Ve(r, e, () => r.next(i), n),
        () => Ve(r, e, () => r.complete(), n),
        (i) => Ve(r, e, () => r.error(i), n)
      )
    );
  });
}
function as(e, n = 0) {
  return Z((t, r) => {
    r.add(e.schedule(() => t.subscribe(r), n));
  });
}
function Lh(e, n) {
  return ye(e).pipe(as(n), ss(n));
}
function Vh(e, n) {
  return ye(e).pipe(as(n), ss(n));
}
function jh(e, n) {
  return new Q((t) => {
    let r = 0;
    return n.schedule(function () {
      r === e.length
        ? t.complete()
        : (t.next(e[r++]), t.closed || this.schedule());
    });
  });
}
function Bh(e, n) {
  return new Q((t) => {
    let r;
    return (
      Ve(t, n, () => {
        (r = e[ns]()),
          Ve(
            t,
            n,
            () => {
              let i, o;
              try {
                ({ value: i, done: o } = r.next());
              } catch (s) {
                t.error(s);
                return;
              }
              o ? t.complete() : t.next(i);
            },
            0,
            !0
          );
      }),
      () => k(r?.return) && r.return()
    );
  });
}
function ls(e, n) {
  if (!e) throw new Error("Iterable cannot be null");
  return new Q((t) => {
    Ve(t, n, () => {
      let r = e[Symbol.asyncIterator]();
      Ve(
        t,
        n,
        () => {
          r.next().then((i) => {
            i.done ? t.complete() : t.next(i.value);
          });
        },
        0,
        !0
      );
    });
  });
}
function Uh(e, n) {
  return ls(is(e), n);
}
function $h(e, n) {
  if (e != null) {
    if (Xo(e)) return Lh(e, n);
    if (Yo(e)) return jh(e, n);
    if (Jo(e)) return Vh(e, n);
    if (es(e)) return ls(e, n);
    if (rs(e)) return Bh(e, n);
    if (os(e)) return Uh(e, n);
  }
  throw ts(e);
}
function ae(e, n) {
  return n ? $h(e, n) : ye(e);
}
function P(...e) {
  let n = hn(e);
  return ae(e, n);
}
function wr(e, n) {
  let t = k(e) ? e : () => e,
    r = (i) => i.error(t());
  return new Q(n ? (i) => n.schedule(r, 0, i) : r);
}
function hc(e) {
  return !!e && (e instanceof Q || (k(e.lift) && k(e.subscribe)));
}
var zt = gr(
  (e) =>
    function () {
      e(this),
        (this.name = "EmptyError"),
        (this.message = "no elements in sequence");
    }
);
function L(e, n) {
  return Z((t, r) => {
    let i = 0;
    t.subscribe(
      W(r, (o) => {
        r.next(e.call(n, o, i++));
      })
    );
  });
}
var { isArray: S_ } = Array;
function M_(e, n) {
  return S_(n) ? e(...n) : e(n);
}
function cs(e) {
  return L((n) => M_(e, n));
}
var { isArray: T_ } = Array,
  { getPrototypeOf: A_, prototype: N_, keys: x_ } = Object;
function us(e) {
  if (e.length === 1) {
    let n = e[0];
    if (T_(n)) return { args: n, keys: null };
    if (R_(n)) {
      let t = x_(n);
      return { args: t.map((r) => n[r]), keys: t };
    }
  }
  return { args: e, keys: null };
}
function R_(e) {
  return e && typeof e == "object" && A_(e) === N_;
}
function ds(e, n) {
  return e.reduce((t, r, i) => ((t[r] = n[i]), t), {});
}
function bi(...e) {
  let n = hn(e),
    t = Ko(e),
    { args: r, keys: i } = us(e);
  if (r.length === 0) return ae([], n);
  let o = new Q(P_(r, n, i ? (s) => ds(i, s) : Qe));
  return t ? o.pipe(cs(t)) : o;
}
function P_(e, n, t = Qe) {
  return (r) => {
    Hh(
      n,
      () => {
        let { length: i } = e,
          o = new Array(i),
          s = i,
          a = i;
        for (let l = 0; l < i; l++)
          Hh(
            n,
            () => {
              let c = ae(e[l], n),
                u = !1;
              c.subscribe(
                W(
                  r,
                  (d) => {
                    (o[l] = d), u || ((u = !0), a--), a || r.next(t(o.slice()));
                  },
                  () => {
                    --s || r.complete();
                  }
                )
              );
            },
            r
          );
      },
      r
    );
  };
}
function Hh(e, n, t) {
  e ? Ve(t, e, n) : n();
}
function zh(e, n, t, r, i, o, s, a) {
  let l = [],
    c = 0,
    u = 0,
    d = !1,
    h = () => {
      d && !l.length && !c && n.complete();
    },
    f = (y) => (c < r ? m(y) : l.push(y)),
    m = (y) => {
      o && n.next(y), c++;
      let E = !1;
      ye(t(y, u++)).subscribe(
        W(
          n,
          (S) => {
            i?.(S), o ? f(S) : n.next(S);
          },
          () => {
            E = !0;
          },
          void 0,
          () => {
            if (E)
              try {
                for (c--; l.length && c < r; ) {
                  let S = l.shift();
                  s ? Ve(n, s, () => m(S)) : m(S);
                }
                h();
              } catch (S) {
                n.error(S);
              }
          }
        )
      );
    };
  return (
    e.subscribe(
      W(n, f, () => {
        (d = !0), h();
      })
    ),
    () => {
      a?.();
    }
  );
}
function ve(e, n, t = 1 / 0) {
  return k(n)
    ? ve((r, i) => L((o, s) => n(r, o, i, s))(ye(e(r, i))), t)
    : (typeof n == "number" && (t = n), Z((r, i) => zh(r, i, e, t)));
}
function Cr(e = 1 / 0) {
  return ve(Qe, e);
}
function Gh() {
  return Cr(1);
}
function br(...e) {
  return Gh()(ae(e, hn(e)));
}
function fs(e) {
  return new Q((n) => {
    ye(e()).subscribe(n);
  });
}
function pc(...e) {
  let n = Ko(e),
    { args: t, keys: r } = us(e),
    i = new Q((o) => {
      let { length: s } = t;
      if (!s) {
        o.complete();
        return;
      }
      let a = new Array(s),
        l = s,
        c = s;
      for (let u = 0; u < s; u++) {
        let d = !1;
        ye(t[u]).subscribe(
          W(
            o,
            (h) => {
              d || ((d = !0), c--), (a[u] = h);
            },
            () => l--,
            void 0,
            () => {
              (!l || !d) && (c || o.next(r ? ds(r, a) : a), o.complete());
            }
          )
        );
      }
    });
  return n ? i.pipe(cs(n)) : i;
}
function je(e, n) {
  return Z((t, r) => {
    let i = 0;
    t.subscribe(W(r, (o) => e.call(n, o, i++) && r.next(o)));
  });
}
function pn(e) {
  return Z((n, t) => {
    let r = null,
      i = !1,
      o;
    (r = n.subscribe(
      W(t, void 0, void 0, (s) => {
        (o = ye(e(s, pn(e)(n)))),
          r ? (r.unsubscribe(), (r = null), o.subscribe(t)) : (i = !0);
      })
    )),
      i && (r.unsubscribe(), (r = null), o.subscribe(t));
  });
}
function qh(e, n, t, r, i) {
  return (o, s) => {
    let a = t,
      l = n,
      c = 0;
    o.subscribe(
      W(
        s,
        (u) => {
          let d = c++;
          (l = a ? e(l, u, d) : ((a = !0), u)), r && s.next(l);
        },
        i &&
          (() => {
            a && s.next(l), s.complete();
          })
      )
    );
  };
}
function Gt(e, n) {
  return k(n) ? ve(e, n, 1) : ve(e, 1);
}
function gn(e) {
  return Z((n, t) => {
    let r = !1;
    n.subscribe(
      W(
        t,
        (i) => {
          (r = !0), t.next(i);
        },
        () => {
          r || t.next(e), t.complete();
        }
      )
    );
  });
}
function qt(e) {
  return e <= 0
    ? () => Ze
    : Z((n, t) => {
        let r = 0;
        n.subscribe(
          W(t, (i) => {
            ++r <= e && (t.next(i), e <= r && t.complete());
          })
        );
      });
}
function gc(e) {
  return L(() => e);
}
function hs(e = O_) {
  return Z((n, t) => {
    let r = !1;
    n.subscribe(
      W(
        t,
        (i) => {
          (r = !0), t.next(i);
        },
        () => (r ? t.complete() : t.error(e()))
      )
    );
  });
}
function O_() {
  return new zt();
}
function mn(e) {
  return Z((n, t) => {
    try {
      n.subscribe(t);
    } finally {
      t.add(e);
    }
  });
}
function St(e, n) {
  let t = arguments.length >= 2;
  return (r) =>
    r.pipe(
      e ? je((i, o) => e(i, o, r)) : Qe,
      qt(1),
      t ? gn(n) : hs(() => new zt())
    );
}
function Ir(e) {
  return e <= 0
    ? () => Ze
    : Z((n, t) => {
        let r = [];
        n.subscribe(
          W(
            t,
            (i) => {
              r.push(i), e < r.length && r.shift();
            },
            () => {
              for (let i of r) t.next(i);
              t.complete();
            },
            void 0,
            () => {
              r = null;
            }
          )
        );
      });
}
function mc(e, n) {
  let t = arguments.length >= 2;
  return (r) =>
    r.pipe(
      e ? je((i, o) => e(i, o, r)) : Qe,
      Ir(1),
      t ? gn(n) : hs(() => new zt())
    );
}
function yc(e, n) {
  return Z(qh(e, n, arguments.length >= 2, !0));
}
function vc(...e) {
  let n = hn(e);
  return Z((t, r) => {
    (n ? br(e, t, n) : br(e, t)).subscribe(r);
  });
}
function Be(e, n) {
  return Z((t, r) => {
    let i = null,
      o = 0,
      s = !1,
      a = () => s && !i && r.complete();
    t.subscribe(
      W(
        r,
        (l) => {
          i?.unsubscribe();
          let c = 0,
            u = o++;
          ye(e(l, u)).subscribe(
            (i = W(
              r,
              (d) => r.next(n ? n(l, d, u, c++) : d),
              () => {
                (i = null), a();
              }
            ))
          );
        },
        () => {
          (s = !0), a();
        }
      )
    );
  });
}
function Dc(e) {
  return Z((n, t) => {
    ye(e).subscribe(W(t, () => t.complete(), Ci)), !t.closed && n.subscribe(t);
  });
}
function be(e, n, t) {
  let r = k(e) || n || t ? { next: e, error: n, complete: t } : e;
  return r
    ? Z((i, o) => {
        var s;
        (s = r.subscribe) === null || s === void 0 || s.call(r);
        let a = !0;
        i.subscribe(
          W(
            o,
            (l) => {
              var c;
              (c = r.next) === null || c === void 0 || c.call(r, l), o.next(l);
            },
            () => {
              var l;
              (a = !1),
                (l = r.complete) === null || l === void 0 || l.call(r),
                o.complete();
            },
            (l) => {
              var c;
              (a = !1),
                (c = r.error) === null || c === void 0 || c.call(r, l),
                o.error(l);
            },
            () => {
              var l, c;
              a && ((l = r.unsubscribe) === null || l === void 0 || l.call(r)),
                (c = r.finalize) === null || c === void 0 || c.call(r);
            }
          )
        );
      })
    : Qe;
}
var kp = "https://g.co/ng/security#xss",
  D = class extends Error {
    code;
    constructor(n, t) {
      super(ea(n, t)), (this.code = n);
    }
  };
function ea(e, n) {
  return `${`NG0${Math.abs(e)}`}${n ? ": " + n : ""}`;
}
var Lp = Symbol("InputSignalNode#UNSET"),
  F_ = q(w({}, rc), {
    transformFn: void 0,
    applyValueToInputSignal(e, n) {
      zo(e, n);
    },
  });
function Vp(e, n) {
  let t = Object.create(F_);
  (t.value = e), (t.transformFn = n?.transform);
  function r() {
    if ((Bo(t), t.value === Lp)) throw new D(-950, !1);
    return t.value;
  }
  return (r[We] = t), r;
}
function Fi(e) {
  return { toString: e }.toString();
}
var ps = "__parameters__";
function k_(e) {
  return function (...t) {
    if (e) {
      let r = e(...t);
      for (let i in r) this[i] = r[i];
    }
  };
}
function jp(e, n, t) {
  return Fi(() => {
    let r = k_(n);
    function i(...o) {
      if (this instanceof i) return r.apply(this, o), this;
      let s = new i(...o);
      return (a.annotation = s), a;
      function a(l, c, u) {
        let d = l.hasOwnProperty(ps)
          ? l[ps]
          : Object.defineProperty(l, ps, { value: [] })[ps];
        for (; d.length <= u; ) d.push(null);
        return (d[u] = d[u] || []).push(s), l;
      }
    }
    return (
      t && (i.prototype = Object.create(t.prototype)),
      (i.prototype.ngMetadataName = e),
      (i.annotationCls = i),
      i
    );
  });
}
var xe = globalThis;
function ie(e) {
  for (let n in e) if (e[n] === ie) return n;
  throw Error("Could not find renamed property on target object.");
}
function L_(e, n) {
  for (let t in n) n.hasOwnProperty(t) && !e.hasOwnProperty(t) && (e[t] = n[t]);
}
function Pe(e) {
  if (typeof e == "string") return e;
  if (Array.isArray(e)) return "[" + e.map(Pe).join(", ") + "]";
  if (e == null) return "" + e;
  if (e.overriddenName) return `${e.overriddenName}`;
  if (e.name) return `${e.name}`;
  let n = e.toString();
  if (n == null) return "" + n;
  let t = n.indexOf(`
`);
  return t === -1 ? n : n.substring(0, t);
}
function Wh(e, n) {
  return e == null || e === ""
    ? n === null
      ? ""
      : n
    : n == null || n === ""
    ? e
    : e + " " + n;
}
var V_ = ie({ __forward_ref__: ie });
function Ot(e) {
  return (
    (e.__forward_ref__ = Ot),
    (e.toString = function () {
      return Pe(this());
    }),
    e
  );
}
function Re(e) {
  return Bp(e) ? e() : e;
}
function Bp(e) {
  return (
    typeof e == "function" && e.hasOwnProperty(V_) && e.__forward_ref__ === Ot
  );
}
function b(e) {
  return {
    token: e.token,
    providedIn: e.providedIn || null,
    factory: e.factory,
    value: void 0,
  };
}
function Ie(e) {
  return { providers: e.providers || [], imports: e.imports || [] };
}
function ta(e) {
  return Qh(e, $p) || Qh(e, Hp);
}
function Up(e) {
  return ta(e) !== null;
}
function Qh(e, n) {
  return e.hasOwnProperty(n) ? e[n] : null;
}
function j_(e) {
  let n = e && (e[$p] || e[Hp]);
  return n || null;
}
function Zh(e) {
  return e && (e.hasOwnProperty(Kh) || e.hasOwnProperty(B_)) ? e[Kh] : null;
}
var $p = ie({ ɵprov: ie }),
  Kh = ie({ ɵinj: ie }),
  Hp = ie({ ngInjectableDef: ie }),
  B_ = ie({ ngInjectorDef: ie }),
  I = class {
    _desc;
    ngMetadataName = "InjectionToken";
    ɵprov;
    constructor(n, t) {
      (this._desc = n),
        (this.ɵprov = void 0),
        typeof t == "number"
          ? (this.__NG_ELEMENT_ID__ = t)
          : t !== void 0 &&
            (this.ɵprov = b({
              token: this,
              providedIn: t.providedIn || "root",
              factory: t.factory,
            }));
    }
    get multi() {
      return this;
    }
    toString() {
      return `InjectionToken ${this._desc}`;
    }
  };
function zp(e) {
  return e && !!e.ɵproviders;
}
var U_ = ie({ ɵcmp: ie }),
  $_ = ie({ ɵdir: ie }),
  H_ = ie({ ɵpipe: ie }),
  z_ = ie({ ɵmod: ie }),
  bs = ie({ ɵfac: ie }),
  Mi = ie({ __NG_ELEMENT_ID__: ie }),
  Yh = ie({ __NG_ENV_ID__: ie });
function na(e) {
  return typeof e == "string" ? e : e == null ? "" : String(e);
}
function G_(e) {
  return typeof e == "function"
    ? e.name || e.toString()
    : typeof e == "object" && e != null && typeof e.type == "function"
    ? e.type.name || e.type.toString()
    : na(e);
}
function q_(e, n) {
  let t = n ? `. Dependency path: ${n.join(" > ")} > ${e}` : "";
  throw new D(-200, e);
}
function bu(e, n) {
  throw new D(-201, !1);
}
var $ = (function (e) {
    return (
      (e[(e.Default = 0)] = "Default"),
      (e[(e.Host = 1)] = "Host"),
      (e[(e.Self = 2)] = "Self"),
      (e[(e.SkipSelf = 4)] = "SkipSelf"),
      (e[(e.Optional = 8)] = "Optional"),
      e
    );
  })($ || {}),
  Pc;
function Gp() {
  return Pc;
}
function Ue(e) {
  let n = Pc;
  return (Pc = e), n;
}
function qp(e, n, t) {
  let r = ta(e);
  if (r && r.providedIn == "root")
    return r.value === void 0 ? (r.value = r.factory()) : r.value;
  if (t & $.Optional) return null;
  if (n !== void 0) return n;
  bu(e, "Injector");
}
var W_ = {},
  Ai = W_,
  Oc = "__NG_DI_FLAG__",
  Is = "ngTempTokenPath",
  Q_ = "ngTokenPath",
  Z_ = /\n/gm,
  K_ = "\u0275",
  Jh = "__source",
  Nr;
function Y_() {
  return Nr;
}
function yn(e) {
  let n = Nr;
  return (Nr = e), n;
}
function J_(e, n = $.Default) {
  if (Nr === void 0) throw new D(-203, !1);
  return Nr === null
    ? qp(e, void 0, n)
    : Nr.get(e, n & $.Optional ? null : void 0, n);
}
function M(e, n = $.Default) {
  return (Gp() || J_)(Re(e), n);
}
function v(e, n = $.Default) {
  return M(e, ra(n));
}
function ra(e) {
  return typeof e > "u" || typeof e == "number"
    ? e
    : 0 | (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4);
}
function Fc(e) {
  let n = [];
  for (let t = 0; t < e.length; t++) {
    let r = Re(e[t]);
    if (Array.isArray(r)) {
      if (r.length === 0) throw new D(900, !1);
      let i,
        o = $.Default;
      for (let s = 0; s < r.length; s++) {
        let a = r[s],
          l = X_(a);
        typeof l == "number" ? (l === -1 ? (i = a.token) : (o |= l)) : (i = a);
      }
      n.push(M(i, o));
    } else n.push(M(r));
  }
  return n;
}
function Wp(e, n) {
  return (e[Oc] = n), (e.prototype[Oc] = n), e;
}
function X_(e) {
  return e[Oc];
}
function eE(e, n, t, r) {
  let i = e[Is];
  throw (
    (n[Jh] && i.unshift(n[Jh]),
    (e.message = tE(
      `
` + e.message,
      i,
      t,
      r
    )),
    (e[Q_] = i),
    (e[Is] = null),
    e)
  );
}
function tE(e, n, t, r = null) {
  e =
    e &&
    e.charAt(0) ===
      `
` &&
    e.charAt(1) == K_
      ? e.slice(2)
      : e;
  let i = Pe(n);
  if (Array.isArray(n)) i = n.map(Pe).join(" -> ");
  else if (typeof n == "object") {
    let o = [];
    for (let s in n)
      if (n.hasOwnProperty(s)) {
        let a = n[s];
        o.push(s + ":" + (typeof a == "string" ? JSON.stringify(a) : Pe(a)));
      }
    i = `{${o.join(", ")}}`;
  }
  return `${t}${r ? "(" + r + ")" : ""}[${i}]: ${e.replace(
    Z_,
    `
  `
  )}`;
}
var ki = Wp(jp("Optional"), 8);
var ia = Wp(jp("SkipSelf"), 4);
function Gn(e, n) {
  let t = e.hasOwnProperty(bs);
  return t ? e[bs] : null;
}
function Iu(e, n) {
  e.forEach((t) => (Array.isArray(t) ? Iu(t, n) : n(t)));
}
function Qp(e, n, t) {
  n >= e.length ? e.push(t) : e.splice(n, 0, t);
}
function Ss(e, n) {
  return n >= e.length - 1 ? e.pop() : e.splice(n, 1)[0];
}
function nE(e, n, t, r) {
  let i = e.length;
  if (i == n) e.push(t, r);
  else if (i === 1) e.push(r, e[0]), (e[0] = t);
  else {
    for (i--, e.push(e[i - 1], e[i]); i > n; ) {
      let o = i - 2;
      (e[i] = e[o]), i--;
    }
    (e[n] = t), (e[n + 1] = r);
  }
}
function rE(e, n, t) {
  let r = Li(e, n);
  return r >= 0 ? (e[r | 1] = t) : ((r = ~r), nE(e, r, n, t)), r;
}
function _c(e, n) {
  let t = Li(e, n);
  if (t >= 0) return e[t | 1];
}
function Li(e, n) {
  return iE(e, n, 1);
}
function iE(e, n, t) {
  let r = 0,
    i = e.length >> t;
  for (; i !== r; ) {
    let o = r + ((i - r) >> 1),
      s = e[o << t];
    if (n === s) return o << t;
    s > n ? (i = o) : (r = o + 1);
  }
  return ~(i << t);
}
var Rr = {},
  ot = [],
  Pr = new I(""),
  Zp = new I("", -1),
  Kp = new I(""),
  Ms = class {
    get(n, t = Ai) {
      if (t === Ai) {
        let r = new Error(`NullInjectorError: No provider for ${Pe(n)}!`);
        throw ((r.name = "NullInjectorError"), r);
      }
      return t;
    }
  };
function Yp(e, n) {
  let t = e[z_] || null;
  if (!t && n === !0)
    throw new Error(`Type ${Pe(e)} does not have '\u0275mod' property.`);
  return t;
}
function _n(e) {
  return e[U_] || null;
}
function Jp(e) {
  return e[$_] || null;
}
function Xp(e) {
  return e[H_] || null;
}
function eg(e) {
  let n = _n(e) || Jp(e) || Xp(e);
  return n !== null ? n.standalone : !1;
}
function oa(e) {
  return { ɵproviders: e };
}
function oE(...e) {
  return { ɵproviders: tg(!0, e), ɵfromNgModule: !0 };
}
function tg(e, ...n) {
  let t = [],
    r = new Set(),
    i,
    o = (s) => {
      t.push(s);
    };
  return (
    Iu(n, (s) => {
      let a = s;
      kc(a, o, [], r) && ((i ||= []), i.push(a));
    }),
    i !== void 0 && ng(i, o),
    t
  );
}
function ng(e, n) {
  for (let t = 0; t < e.length; t++) {
    let { ngModule: r, providers: i } = e[t];
    Su(i, (o) => {
      n(o, r);
    });
  }
}
function kc(e, n, t, r) {
  if (((e = Re(e)), !e)) return !1;
  let i = null,
    o = Zh(e),
    s = !o && _n(e);
  if (!o && !s) {
    let l = e.ngModule;
    if (((o = Zh(l)), o)) i = l;
    else return !1;
  } else {
    if (s && !s.standalone) return !1;
    i = e;
  }
  let a = r.has(i);
  if (s) {
    if (a) return !1;
    if ((r.add(i), s.dependencies)) {
      let l =
        typeof s.dependencies == "function" ? s.dependencies() : s.dependencies;
      for (let c of l) kc(c, n, t, r);
    }
  } else if (o) {
    if (o.imports != null && !a) {
      r.add(i);
      let c;
      try {
        Iu(o.imports, (u) => {
          kc(u, n, t, r) && ((c ||= []), c.push(u));
        });
      } finally {
      }
      c !== void 0 && ng(c, n);
    }
    if (!a) {
      let c = Gn(i) || (() => new i());
      n({ provide: i, useFactory: c, deps: ot }, i),
        n({ provide: Kp, useValue: i, multi: !0 }, i),
        n({ provide: Pr, useValue: () => M(i), multi: !0 }, i);
    }
    let l = o.providers;
    if (l != null && !a) {
      let c = e;
      Su(l, (u) => {
        n(u, c);
      });
    }
  } else return !1;
  return i !== e && e.providers !== void 0;
}
function Su(e, n) {
  for (let t of e)
    zp(t) && (t = t.ɵproviders), Array.isArray(t) ? Su(t, n) : n(t);
}
var sE = ie({ provide: String, useValue: ie });
function rg(e) {
  return e !== null && typeof e == "object" && sE in e;
}
function aE(e) {
  return !!(e && e.useExisting);
}
function lE(e) {
  return !!(e && e.useFactory);
}
function Or(e) {
  return typeof e == "function";
}
function cE(e) {
  return !!e.useClass;
}
var sa = new I(""),
  _s = {},
  uE = {},
  Ec;
function Mu() {
  return Ec === void 0 && (Ec = new Ms()), Ec;
}
var Oe = class {},
  Ni = class extends Oe {
    parent;
    source;
    scopes;
    records = new Map();
    _ngOnDestroyHooks = new Set();
    _onDestroyHooks = [];
    get destroyed() {
      return this._destroyed;
    }
    _destroyed = !1;
    injectorDefTypes;
    constructor(n, t, r, i) {
      super(),
        (this.parent = t),
        (this.source = r),
        (this.scopes = i),
        Vc(n, (s) => this.processProvider(s)),
        this.records.set(Zp, Sr(void 0, this)),
        i.has("environment") && this.records.set(Oe, Sr(void 0, this));
      let o = this.records.get(sa);
      o != null && typeof o.value == "string" && this.scopes.add(o.value),
        (this.injectorDefTypes = new Set(this.get(Kp, ot, $.Self)));
    }
    destroy() {
      Ii(this), (this._destroyed = !0);
      let n = Y(null);
      try {
        for (let r of this._ngOnDestroyHooks) r.ngOnDestroy();
        let t = this._onDestroyHooks;
        this._onDestroyHooks = [];
        for (let r of t) r();
      } finally {
        this.records.clear(),
          this._ngOnDestroyHooks.clear(),
          this.injectorDefTypes.clear(),
          Y(n);
      }
    }
    onDestroy(n) {
      return (
        Ii(this), this._onDestroyHooks.push(n), () => this.removeOnDestroy(n)
      );
    }
    runInContext(n) {
      Ii(this);
      let t = yn(this),
        r = Ue(void 0),
        i;
      try {
        return n();
      } finally {
        yn(t), Ue(r);
      }
    }
    get(n, t = Ai, r = $.Default) {
      if ((Ii(this), n.hasOwnProperty(Yh))) return n[Yh](this);
      r = ra(r);
      let i,
        o = yn(this),
        s = Ue(void 0);
      try {
        if (!(r & $.SkipSelf)) {
          let l = this.records.get(n);
          if (l === void 0) {
            let c = gE(n) && ta(n);
            c && this.injectableDefInScope(c)
              ? (l = Sr(Lc(n), _s))
              : (l = null),
              this.records.set(n, l);
          }
          if (l != null) return this.hydrate(n, l);
        }
        let a = r & $.Self ? Mu() : this.parent;
        return (t = r & $.Optional && t === Ai ? null : t), a.get(n, t);
      } catch (a) {
        if (a.name === "NullInjectorError") {
          if (((a[Is] = a[Is] || []).unshift(Pe(n)), o)) throw a;
          return eE(a, n, "R3InjectorError", this.source);
        } else throw a;
      } finally {
        Ue(s), yn(o);
      }
    }
    resolveInjectorInitializers() {
      let n = Y(null),
        t = yn(this),
        r = Ue(void 0),
        i;
      try {
        let o = this.get(Pr, ot, $.Self);
        for (let s of o) s();
      } finally {
        yn(t), Ue(r), Y(n);
      }
    }
    toString() {
      let n = [],
        t = this.records;
      for (let r of t.keys()) n.push(Pe(r));
      return `R3Injector[${n.join(", ")}]`;
    }
    processProvider(n) {
      n = Re(n);
      let t = Or(n) ? n : Re(n && n.provide),
        r = fE(n);
      if (!Or(n) && n.multi === !0) {
        let i = this.records.get(t);
        i ||
          ((i = Sr(void 0, _s, !0)),
          (i.factory = () => Fc(i.multi)),
          this.records.set(t, i)),
          (t = n),
          i.multi.push(n);
      }
      this.records.set(t, r);
    }
    hydrate(n, t) {
      let r = Y(null);
      try {
        return (
          t.value === _s && ((t.value = uE), (t.value = t.factory())),
          typeof t.value == "object" &&
            t.value &&
            pE(t.value) &&
            this._ngOnDestroyHooks.add(t.value),
          t.value
        );
      } finally {
        Y(r);
      }
    }
    injectableDefInScope(n) {
      if (!n.providedIn) return !1;
      let t = Re(n.providedIn);
      return typeof t == "string"
        ? t === "any" || this.scopes.has(t)
        : this.injectorDefTypes.has(t);
    }
    removeOnDestroy(n) {
      let t = this._onDestroyHooks.indexOf(n);
      t !== -1 && this._onDestroyHooks.splice(t, 1);
    }
  };
function Lc(e) {
  let n = ta(e),
    t = n !== null ? n.factory : Gn(e);
  if (t !== null) return t;
  if (e instanceof I) throw new D(204, !1);
  if (e instanceof Function) return dE(e);
  throw new D(204, !1);
}
function dE(e) {
  if (e.length > 0) throw new D(204, !1);
  let t = j_(e);
  return t !== null ? () => t.factory(e) : () => new e();
}
function fE(e) {
  if (rg(e)) return Sr(void 0, e.useValue);
  {
    let n = ig(e);
    return Sr(n, _s);
  }
}
function ig(e, n, t) {
  let r;
  if (Or(e)) {
    let i = Re(e);
    return Gn(i) || Lc(i);
  } else if (rg(e)) r = () => Re(e.useValue);
  else if (lE(e)) r = () => e.useFactory(...Fc(e.deps || []));
  else if (aE(e)) r = () => M(Re(e.useExisting));
  else {
    let i = Re(e && (e.useClass || e.provide));
    if (hE(e)) r = () => new i(...Fc(e.deps));
    else return Gn(i) || Lc(i);
  }
  return r;
}
function Ii(e) {
  if (e.destroyed) throw new D(205, !1);
}
function Sr(e, n, t = !1) {
  return { factory: e, value: n, multi: t ? [] : void 0 };
}
function hE(e) {
  return !!e.deps;
}
function pE(e) {
  return (
    e !== null && typeof e == "object" && typeof e.ngOnDestroy == "function"
  );
}
function gE(e) {
  return typeof e == "function" || (typeof e == "object" && e instanceof I);
}
function Vc(e, n) {
  for (let t of e)
    Array.isArray(t) ? Vc(t, n) : t && zp(t) ? Vc(t.ɵproviders, n) : n(t);
}
function $e(e, n) {
  e instanceof Ni && Ii(e);
  let t,
    r = yn(e),
    i = Ue(void 0);
  try {
    return n();
  } finally {
    yn(r), Ue(i);
  }
}
function og() {
  return Gp() !== void 0 || Y_() != null;
}
function mE(e) {
  if (!og()) throw new D(-203, !1);
}
function yE(e) {
  let n = xe.ng;
  if (n && n.ɵcompilerFacade) return n.ɵcompilerFacade;
  throw new Error("JIT compiler unavailable");
}
function vE(e) {
  return typeof e == "function";
}
var Zt = 0,
  z = 1,
  F = 2,
  Fe = 3,
  mt = 4,
  vt = 5,
  Ts = 6,
  As = 7,
  yt = 8,
  Fr = 9,
  Wt = 10,
  De = 11,
  xi = 12,
  Xh = 13,
  Hr = 14,
  At = 15,
  kr = 16,
  Mr = 17,
  Lr = 18,
  aa = 19,
  sg = 20,
  vn = 21,
  wc = 22,
  Ns = 23,
  Ke = 24,
  Nt = 25,
  ag = 1;
var qn = 7,
  xs = 8,
  Rs = 9,
  st = 10,
  Ps = (function (e) {
    return (
      (e[(e.None = 0)] = "None"),
      (e[(e.HasTransplantedViews = 2)] = "HasTransplantedViews"),
      e
    );
  })(Ps || {});
function Dn(e) {
  return Array.isArray(e) && typeof e[ag] == "object";
}
function Kt(e) {
  return Array.isArray(e) && e[ag] === !0;
}
function lg(e) {
  return (e.flags & 4) !== 0;
}
function la(e) {
  return e.componentOffset > -1;
}
function Tu(e) {
  return (e.flags & 1) === 1;
}
function En(e) {
  return !!e.template;
}
function jc(e) {
  return (e[F] & 512) !== 0;
}
var Bc = class {
  previousValue;
  currentValue;
  firstChange;
  constructor(n, t, r) {
    (this.previousValue = n), (this.currentValue = t), (this.firstChange = r);
  }
  isFirstChange() {
    return this.firstChange;
  }
};
function cg(e, n, t, r) {
  n !== null ? n.applyValueToInputSignal(n, r) : (e[t] = r);
}
var Xn = (() => {
  let e = () => ug;
  return (e.ngInherit = !0), e;
})();
function ug(e) {
  return e.type.prototype.ngOnChanges && (e.setInput = _E), DE;
}
function DE() {
  let e = fg(this),
    n = e?.current;
  if (n) {
    let t = e.previous;
    if (t === Rr) e.previous = n;
    else for (let r in n) t[r] = n[r];
    (e.current = null), this.ngOnChanges(n);
  }
}
function _E(e, n, t, r, i) {
  let o = this.declaredInputs[r],
    s = fg(e) || EE(e, { previous: Rr, current: null }),
    a = s.current || (s.current = {}),
    l = s.previous,
    c = l[o];
  (a[o] = new Bc(c && c.currentValue, t, l === Rr)), cg(e, n, i, t);
}
var dg = "__ngSimpleChanges__";
function fg(e) {
  return e[dg] || null;
}
function EE(e, n) {
  return (e[dg] = n);
}
var ep = null;
var Mt = function (e, n, t) {
    ep?.(e, n, t);
  },
  wE = "svg",
  CE = "math";
function xt(e) {
  for (; Array.isArray(e); ) e = e[Zt];
  return e;
}
function hg(e, n) {
  return xt(n[e]);
}
function at(e, n) {
  return xt(n[e.index]);
}
function pg(e, n) {
  return e.data[n];
}
function bE(e, n) {
  return e[n];
}
function In(e, n) {
  let t = n[e];
  return Dn(t) ? t : t[Zt];
}
function Au(e) {
  return (e[F] & 128) === 128;
}
function IE(e) {
  return Kt(e[Fe]);
}
function Os(e, n) {
  return n == null ? null : e[n];
}
function gg(e) {
  e[Mr] = 0;
}
function Nu(e) {
  e[F] & 1024 || ((e[F] |= 1024), Au(e) && ua(e));
}
function SE(e, n) {
  for (; e > 0; ) (n = n[Hr]), e--;
  return n;
}
function ca(e) {
  return !!(e[F] & 9216 || e[Ke]?.dirty);
}
function Uc(e) {
  e[Wt].changeDetectionScheduler?.notify(9),
    e[F] & 64 && (e[F] |= 1024),
    ca(e) && ua(e);
}
function ua(e) {
  e[Wt].changeDetectionScheduler?.notify(0);
  let n = Wn(e);
  for (; n !== null && !(n[F] & 8192 || ((n[F] |= 8192), !Au(n))); ) n = Wn(n);
}
function mg(e, n) {
  if ((e[F] & 256) === 256) throw new D(911, !1);
  e[vn] === null && (e[vn] = []), e[vn].push(n);
}
function ME(e, n) {
  if (e[vn] === null) return;
  let t = e[vn].indexOf(n);
  t !== -1 && e[vn].splice(t, 1);
}
function Wn(e) {
  let n = e[Fe];
  return Kt(n) ? n[Fe] : n;
}
var G = { lFrame: Ig(null), bindingsEnabled: !0, skipHydrationRootTNode: null };
var $c = !1;
function TE() {
  return G.lFrame.elementDepthCount;
}
function AE() {
  G.lFrame.elementDepthCount++;
}
function NE() {
  G.lFrame.elementDepthCount--;
}
function yg() {
  return G.bindingsEnabled;
}
function xE() {
  return G.skipHydrationRootTNode !== null;
}
function RE(e) {
  return G.skipHydrationRootTNode === e;
}
function PE() {
  G.skipHydrationRootTNode = null;
}
function ne() {
  return G.lFrame.lView;
}
function ke() {
  return G.lFrame.tView;
}
function da(e) {
  return (G.lFrame.contextLView = e), e[yt];
}
function fa(e) {
  return (G.lFrame.contextLView = null), e;
}
function Le() {
  let e = vg();
  for (; e !== null && e.type === 64; ) e = e.parent;
  return e;
}
function vg() {
  return G.lFrame.currentTNode;
}
function OE() {
  let e = G.lFrame,
    n = e.currentTNode;
  return e.isParent ? n : n.parent;
}
function Vi(e, n) {
  let t = G.lFrame;
  (t.currentTNode = e), (t.isParent = n);
}
function Dg() {
  return G.lFrame.isParent;
}
function FE() {
  G.lFrame.isParent = !1;
}
function _g() {
  return $c;
}
function tp(e) {
  let n = $c;
  return ($c = e), n;
}
function Eg() {
  let e = G.lFrame,
    n = e.bindingRootIndex;
  return n === -1 && (n = e.bindingRootIndex = e.tView.bindingStartIndex), n;
}
function kE(e) {
  return (G.lFrame.bindingIndex = e);
}
function ha() {
  return G.lFrame.bindingIndex++;
}
function LE(e) {
  let n = G.lFrame,
    t = n.bindingIndex;
  return (n.bindingIndex = n.bindingIndex + e), t;
}
function VE() {
  return G.lFrame.inI18n;
}
function jE(e, n) {
  let t = G.lFrame;
  (t.bindingIndex = t.bindingRootIndex = e), Hc(n);
}
function BE() {
  return G.lFrame.currentDirectiveIndex;
}
function Hc(e) {
  G.lFrame.currentDirectiveIndex = e;
}
function UE(e) {
  let n = G.lFrame.currentDirectiveIndex;
  return n === -1 ? null : e[n];
}
function wg(e) {
  G.lFrame.currentQueryIndex = e;
}
function $E(e) {
  let n = e[z];
  return n.type === 2 ? n.declTNode : n.type === 1 ? e[vt] : null;
}
function Cg(e, n, t) {
  if (t & $.SkipSelf) {
    let i = n,
      o = e;
    for (; (i = i.parent), i === null && !(t & $.Host); )
      if (((i = $E(o)), i === null || ((o = o[Hr]), i.type & 10))) break;
    if (i === null) return !1;
    (n = i), (e = o);
  }
  let r = (G.lFrame = bg());
  return (r.currentTNode = n), (r.lView = e), !0;
}
function xu(e) {
  let n = bg(),
    t = e[z];
  (G.lFrame = n),
    (n.currentTNode = t.firstChild),
    (n.lView = e),
    (n.tView = t),
    (n.contextLView = e),
    (n.bindingIndex = t.bindingStartIndex),
    (n.inI18n = !1);
}
function bg() {
  let e = G.lFrame,
    n = e === null ? null : e.child;
  return n === null ? Ig(e) : n;
}
function Ig(e) {
  let n = {
    currentTNode: null,
    isParent: !0,
    lView: null,
    tView: null,
    selectedIndex: -1,
    contextLView: null,
    elementDepthCount: 0,
    currentNamespace: null,
    currentDirectiveIndex: -1,
    bindingRootIndex: -1,
    bindingIndex: -1,
    currentQueryIndex: 0,
    parent: e,
    child: null,
    inI18n: !1,
  };
  return e !== null && (e.child = n), n;
}
function Sg() {
  let e = G.lFrame;
  return (G.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e;
}
var Mg = Sg;
function Ru() {
  let e = Sg();
  (e.isParent = !0),
    (e.tView = null),
    (e.selectedIndex = -1),
    (e.contextLView = null),
    (e.elementDepthCount = 0),
    (e.currentDirectiveIndex = -1),
    (e.currentNamespace = null),
    (e.bindingRootIndex = -1),
    (e.bindingIndex = -1),
    (e.currentQueryIndex = 0);
}
function HE(e) {
  return (G.lFrame.contextLView = SE(e, G.lFrame.contextLView))[yt];
}
function zr() {
  return G.lFrame.selectedIndex;
}
function Qn(e) {
  G.lFrame.selectedIndex = e;
}
function pa() {
  let e = G.lFrame;
  return pg(e.tView, e.selectedIndex);
}
function zE() {
  return G.lFrame.currentNamespace;
}
var Tg = !0;
function Pu() {
  return Tg;
}
function Ou(e) {
  Tg = e;
}
function GE(e, n, t) {
  let { ngOnChanges: r, ngOnInit: i, ngDoCheck: o } = n.type.prototype;
  if (r) {
    let s = ug(n);
    (t.preOrderHooks ??= []).push(e, s),
      (t.preOrderCheckHooks ??= []).push(e, s);
  }
  i && (t.preOrderHooks ??= []).push(0 - e, i),
    o &&
      ((t.preOrderHooks ??= []).push(e, o),
      (t.preOrderCheckHooks ??= []).push(e, o));
}
function Fu(e, n) {
  for (let t = n.directiveStart, r = n.directiveEnd; t < r; t++) {
    let o = e.data[t].type.prototype,
      {
        ngAfterContentInit: s,
        ngAfterContentChecked: a,
        ngAfterViewInit: l,
        ngAfterViewChecked: c,
        ngOnDestroy: u,
      } = o;
    s && (e.contentHooks ??= []).push(-t, s),
      a &&
        ((e.contentHooks ??= []).push(t, a),
        (e.contentCheckHooks ??= []).push(t, a)),
      l && (e.viewHooks ??= []).push(-t, l),
      c &&
        ((e.viewHooks ??= []).push(t, c), (e.viewCheckHooks ??= []).push(t, c)),
      u != null && (e.destroyHooks ??= []).push(t, u);
  }
}
function Es(e, n, t) {
  Ag(e, n, 3, t);
}
function ws(e, n, t, r) {
  (e[F] & 3) === t && Ag(e, n, t, r);
}
function Cc(e, n) {
  let t = e[F];
  (t & 3) === n && ((t &= 16383), (t += 1), (e[F] = t));
}
function Ag(e, n, t, r) {
  let i = r !== void 0 ? e[Mr] & 65535 : 0,
    o = r ?? -1,
    s = n.length - 1,
    a = 0;
  for (let l = i; l < s; l++)
    if (typeof n[l + 1] == "number") {
      if (((a = n[l]), r != null && a >= r)) break;
    } else
      n[l] < 0 && (e[Mr] += 65536),
        (a < o || o == -1) &&
          (qE(e, t, n, l), (e[Mr] = (e[Mr] & 4294901760) + l + 2)),
        l++;
}
function np(e, n) {
  Mt(4, e, n);
  let t = Y(null);
  try {
    n.call(e);
  } finally {
    Y(t), Mt(5, e, n);
  }
}
function qE(e, n, t, r) {
  let i = t[r] < 0,
    o = t[r + 1],
    s = i ? -t[r] : t[r],
    a = e[s];
  i
    ? e[F] >> 14 < e[Mr] >> 16 &&
      (e[F] & 3) === n &&
      ((e[F] += 16384), np(a, o))
    : np(a, o);
}
var xr = -1,
  Zn = class {
    factory;
    injectImpl;
    resolving = !1;
    canSeeViewProviders;
    multi;
    componentProviders;
    index;
    providerFactory;
    constructor(n, t, r) {
      (this.factory = n), (this.canSeeViewProviders = t), (this.injectImpl = r);
    }
  };
function WE(e) {
  return e instanceof Zn;
}
function QE(e) {
  return (e.flags & 8) !== 0;
}
function ZE(e) {
  return (e.flags & 16) !== 0;
}
function zc(e, n, t) {
  let r = 0;
  for (; r < t.length; ) {
    let i = t[r];
    if (typeof i == "number") {
      if (i !== 0) break;
      r++;
      let o = t[r++],
        s = t[r++],
        a = t[r++];
      e.setAttribute(n, s, a, o);
    } else {
      let o = i,
        s = t[++r];
      KE(o) ? e.setProperty(n, o, s) : e.setAttribute(n, o, s), r++;
    }
  }
  return r;
}
function Ng(e) {
  return e === 3 || e === 4 || e === 6;
}
function KE(e) {
  return e.charCodeAt(0) === 64;
}
function Ri(e, n) {
  if (!(n === null || n.length === 0))
    if (e === null || e.length === 0) e = n.slice();
    else {
      let t = -1;
      for (let r = 0; r < n.length; r++) {
        let i = n[r];
        typeof i == "number"
          ? (t = i)
          : t === 0 ||
            (t === -1 || t === 2
              ? rp(e, t, i, null, n[++r])
              : rp(e, t, i, null, null));
      }
    }
  return e;
}
function rp(e, n, t, r, i) {
  let o = 0,
    s = e.length;
  if (n === -1) s = -1;
  else
    for (; o < e.length; ) {
      let a = e[o++];
      if (typeof a == "number") {
        if (a === n) {
          s = -1;
          break;
        } else if (a > n) {
          s = o - 1;
          break;
        }
      }
    }
  for (; o < e.length; ) {
    let a = e[o];
    if (typeof a == "number") break;
    if (a === t) {
      if (r === null) {
        i !== null && (e[o + 1] = i);
        return;
      } else if (r === e[o + 1]) {
        e[o + 2] = i;
        return;
      }
    }
    o++, r !== null && o++, i !== null && o++;
  }
  s !== -1 && (e.splice(s, 0, n), (o = s + 1)),
    e.splice(o++, 0, t),
    r !== null && e.splice(o++, 0, r),
    i !== null && e.splice(o++, 0, i);
}
var bc = {},
  Gc = class {
    injector;
    parentInjector;
    constructor(n, t) {
      (this.injector = n), (this.parentInjector = t);
    }
    get(n, t, r) {
      r = ra(r);
      let i = this.injector.get(n, bc, r);
      return i !== bc || t === bc ? i : this.parentInjector.get(n, t, r);
    }
  };
function xg(e) {
  return e !== xr;
}
function Fs(e) {
  return e & 32767;
}
function YE(e) {
  return e >> 16;
}
function ks(e, n) {
  let t = YE(e),
    r = n;
  for (; t > 0; ) (r = r[Hr]), t--;
  return r;
}
var qc = !0;
function Ls(e) {
  let n = qc;
  return (qc = e), n;
}
var JE = 256,
  Rg = JE - 1,
  Pg = 5,
  XE = 0,
  Tt = {};
function ew(e, n, t) {
  let r;
  typeof t == "string"
    ? (r = t.charCodeAt(0) || 0)
    : t.hasOwnProperty(Mi) && (r = t[Mi]),
    r == null && (r = t[Mi] = XE++);
  let i = r & Rg,
    o = 1 << i;
  n.data[e + (i >> Pg)] |= o;
}
function Vs(e, n) {
  let t = Og(e, n);
  if (t !== -1) return t;
  let r = n[z];
  r.firstCreatePass &&
    ((e.injectorIndex = n.length),
    Ic(r.data, e),
    Ic(n, null),
    Ic(r.blueprint, null));
  let i = ku(e, n),
    o = e.injectorIndex;
  if (xg(i)) {
    let s = Fs(i),
      a = ks(i, n),
      l = a[z].data;
    for (let c = 0; c < 8; c++) n[o + c] = a[s + c] | l[s + c];
  }
  return (n[o + 8] = i), o;
}
function Ic(e, n) {
  e.push(0, 0, 0, 0, 0, 0, 0, 0, n);
}
function Og(e, n) {
  return e.injectorIndex === -1 ||
    (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
    n[e.injectorIndex + 8] === null
    ? -1
    : e.injectorIndex;
}
function ku(e, n) {
  if (e.parent && e.parent.injectorIndex !== -1) return e.parent.injectorIndex;
  let t = 0,
    r = null,
    i = n;
  for (; i !== null; ) {
    if (((r = jg(i)), r === null)) return xr;
    if ((t++, (i = i[Hr]), r.injectorIndex !== -1))
      return r.injectorIndex | (t << 16);
  }
  return xr;
}
function Wc(e, n, t) {
  ew(e, n, t);
}
function tw(e, n) {
  if (n === "class") return e.classes;
  if (n === "style") return e.styles;
  let t = e.attrs;
  if (t) {
    let r = t.length,
      i = 0;
    for (; i < r; ) {
      let o = t[i];
      if (Ng(o)) break;
      if (o === 0) i = i + 2;
      else if (typeof o == "number")
        for (i++; i < r && typeof t[i] == "string"; ) i++;
      else {
        if (o === n) return t[i + 1];
        i = i + 2;
      }
    }
  }
  return null;
}
function Fg(e, n, t) {
  if (t & $.Optional || e !== void 0) return e;
  bu(n, "NodeInjector");
}
function kg(e, n, t, r) {
  if (
    (t & $.Optional && r === void 0 && (r = null), !(t & ($.Self | $.Host)))
  ) {
    let i = e[Fr],
      o = Ue(void 0);
    try {
      return i ? i.get(n, r, t & $.Optional) : qp(n, r, t & $.Optional);
    } finally {
      Ue(o);
    }
  }
  return Fg(r, n, t);
}
function Lg(e, n, t, r = $.Default, i) {
  if (e !== null) {
    if (n[F] & 2048 && !(r & $.Self)) {
      let s = sw(e, n, t, r, Tt);
      if (s !== Tt) return s;
    }
    let o = Vg(e, n, t, r, Tt);
    if (o !== Tt) return o;
  }
  return kg(n, t, r, i);
}
function Vg(e, n, t, r, i) {
  let o = iw(t);
  if (typeof o == "function") {
    if (!Cg(n, e, r)) return r & $.Host ? Fg(i, t, r) : kg(n, t, r, i);
    try {
      let s;
      if (((s = o(r)), s == null && !(r & $.Optional))) bu(t);
      else return s;
    } finally {
      Mg();
    }
  } else if (typeof o == "number") {
    let s = null,
      a = Og(e, n),
      l = xr,
      c = r & $.Host ? n[At][vt] : null;
    for (
      (a === -1 || r & $.SkipSelf) &&
      ((l = a === -1 ? ku(e, n) : n[a + 8]),
      l === xr || !op(r, !1)
        ? (a = -1)
        : ((s = n[z]), (a = Fs(l)), (n = ks(l, n))));
      a !== -1;

    ) {
      let u = n[z];
      if (ip(o, a, u.data)) {
        let d = nw(a, n, t, s, r, c);
        if (d !== Tt) return d;
      }
      (l = n[a + 8]),
        l !== xr && op(r, n[z].data[a + 8] === c) && ip(o, a, n)
          ? ((s = u), (a = Fs(l)), (n = ks(l, n)))
          : (a = -1);
    }
  }
  return i;
}
function nw(e, n, t, r, i, o) {
  let s = n[z],
    a = s.data[e + 8],
    l = r == null ? la(a) && qc : r != s && (a.type & 3) !== 0,
    c = i & $.Host && o === a,
    u = rw(a, s, t, l, c);
  return u !== null ? Vr(n, s, u, a) : Tt;
}
function rw(e, n, t, r, i) {
  let o = e.providerIndexes,
    s = n.data,
    a = o & 1048575,
    l = e.directiveStart,
    c = e.directiveEnd,
    u = o >> 20,
    d = r ? a : a + u,
    h = i ? a + u : c;
  for (let f = d; f < h; f++) {
    let m = s[f];
    if ((f < l && t === m) || (f >= l && m.type === t)) return f;
  }
  if (i) {
    let f = s[l];
    if (f && En(f) && f.type === t) return l;
  }
  return null;
}
function Vr(e, n, t, r) {
  let i = e[t],
    o = n.data;
  if (WE(i)) {
    let s = i;
    s.resolving && q_(G_(o[t]));
    let a = Ls(s.canSeeViewProviders);
    s.resolving = !0;
    let l,
      c = s.injectImpl ? Ue(s.injectImpl) : null,
      u = Cg(e, r, $.Default);
    try {
      (i = e[t] = s.factory(void 0, o, e, r)),
        n.firstCreatePass && t >= r.directiveStart && GE(t, o[t], n);
    } finally {
      c !== null && Ue(c), Ls(a), (s.resolving = !1), Mg();
    }
  }
  return i;
}
function iw(e) {
  if (typeof e == "string") return e.charCodeAt(0) || 0;
  let n = e.hasOwnProperty(Mi) ? e[Mi] : void 0;
  return typeof n == "number" ? (n >= 0 ? n & Rg : ow) : n;
}
function ip(e, n, t) {
  let r = 1 << e;
  return !!(t[n + (e >> Pg)] & r);
}
function op(e, n) {
  return !(e & $.Self) && !(e & $.Host && n);
}
var zn = class {
  _tNode;
  _lView;
  constructor(n, t) {
    (this._tNode = n), (this._lView = t);
  }
  get(n, t, r) {
    return Lg(this._tNode, this._lView, n, ra(r), t);
  }
};
function ow() {
  return new zn(Le(), ne());
}
function Yt(e) {
  return Fi(() => {
    let n = e.prototype.constructor,
      t = n[bs] || Qc(n),
      r = Object.prototype,
      i = Object.getPrototypeOf(e.prototype).constructor;
    for (; i && i !== r; ) {
      let o = i[bs] || Qc(i);
      if (o && o !== t) return o;
      i = Object.getPrototypeOf(i);
    }
    return (o) => new o();
  });
}
function Qc(e) {
  return Bp(e)
    ? () => {
        let n = Qc(Re(e));
        return n && n();
      }
    : Gn(e);
}
function sw(e, n, t, r, i) {
  let o = e,
    s = n;
  for (; o !== null && s !== null && s[F] & 2048 && !(s[F] & 512); ) {
    let a = Vg(o, s, t, r | $.Self, Tt);
    if (a !== Tt) return a;
    let l = o.parent;
    if (!l) {
      let c = s[sg];
      if (c) {
        let u = c.get(t, Tt, r);
        if (u !== Tt) return u;
      }
      (l = jg(s)), (s = s[Hr]);
    }
    o = l;
  }
  return i;
}
function jg(e) {
  let n = e[z],
    t = n.type;
  return t === 2 ? n.declTNode : t === 1 ? e[vt] : null;
}
function Lu(e) {
  return tw(Le(), e);
}
function sp(e, n = null, t = null, r) {
  let i = Bg(e, n, t, r);
  return i.resolveInjectorInitializers(), i;
}
function Bg(e, n = null, t = null, r, i = new Set()) {
  let o = [t || ot, oE(e)];
  return (
    (r = r || (typeof e == "object" ? void 0 : Pe(e))),
    new Ni(o, n || Mu(), r || null, i)
  );
}
var Ye = class e {
  static THROW_IF_NOT_FOUND = Ai;
  static NULL = new Ms();
  static create(n, t) {
    if (Array.isArray(n)) return sp({ name: "" }, t, n, "");
    {
      let r = n.name ?? "";
      return sp({ name: r }, n.parent, n.providers, r);
    }
  }
  static ɵprov = b({ token: e, providedIn: "any", factory: () => M(Zp) });
  static __NG_ELEMENT_ID__ = -1;
};
var aw = new I("");
aw.__NG_ELEMENT_ID__ = (e) => {
  let n = Le();
  if (n === null) throw new D(204, !1);
  if (n.type & 2) return n.value;
  if (e & $.Optional) return null;
  throw new D(204, !1);
};
var Ug = !1,
  Vu = (() => {
    class e {
      static __NG_ELEMENT_ID__ = lw;
      static __NG_ENV_ID__ = (t) => t;
    }
    return e;
  })(),
  Zc = class extends Vu {
    _lView;
    constructor(n) {
      super(), (this._lView = n);
    }
    onDestroy(n) {
      return mg(this._lView, n), () => ME(this._lView, n);
    }
  };
function lw() {
  return new Zc(ne());
}
var jr = class {},
  ju = new I("", { providedIn: "root", factory: () => !1 });
var $g = new I(""),
  Hg = new I(""),
  Jt = (() => {
    class e {
      taskId = 0;
      pendingTasks = new Set();
      get _hasPendingTasks() {
        return this.hasPendingTasks.value;
      }
      hasPendingTasks = new Ae(!1);
      add() {
        this._hasPendingTasks || this.hasPendingTasks.next(!0);
        let t = this.taskId++;
        return this.pendingTasks.add(t), t;
      }
      has(t) {
        return this.pendingTasks.has(t);
      }
      remove(t) {
        this.pendingTasks.delete(t),
          this.pendingTasks.size === 0 &&
            this._hasPendingTasks &&
            this.hasPendingTasks.next(!1);
      }
      ngOnDestroy() {
        this.pendingTasks.clear(),
          this._hasPendingTasks && this.hasPendingTasks.next(!1);
      }
      static ɵprov = b({
        token: e,
        providedIn: "root",
        factory: () => new e(),
      });
    }
    return e;
  })();
var Kc = class extends Ee {
    __isAsync;
    destroyRef = void 0;
    pendingTasks = void 0;
    constructor(n = !1) {
      super(),
        (this.__isAsync = n),
        og() &&
          ((this.destroyRef = v(Vu, { optional: !0 }) ?? void 0),
          (this.pendingTasks = v(Jt, { optional: !0 }) ?? void 0));
    }
    emit(n) {
      let t = Y(null);
      try {
        super.next(n);
      } finally {
        Y(t);
      }
    }
    subscribe(n, t, r) {
      let i = n,
        o = t || (() => null),
        s = r;
      if (n && typeof n == "object") {
        let l = n;
        (i = l.next?.bind(l)),
          (o = l.error?.bind(l)),
          (s = l.complete?.bind(l));
      }
      this.__isAsync &&
        ((o = this.wrapInTimeout(o)),
        i && (i = this.wrapInTimeout(i)),
        s && (s = this.wrapInTimeout(s)));
      let a = super.subscribe({ next: i, error: o, complete: s });
      return n instanceof me && n.add(a), a;
    }
    wrapInTimeout(n) {
      return (t) => {
        let r = this.pendingTasks?.add();
        setTimeout(() => {
          n(t), r !== void 0 && this.pendingTasks?.remove(r);
        });
      };
    }
  },
  pe = Kc;
function js(...e) {}
function zg(e) {
  let n, t;
  function r() {
    e = js;
    try {
      t !== void 0 &&
        typeof cancelAnimationFrame == "function" &&
        cancelAnimationFrame(t),
        n !== void 0 && clearTimeout(n);
    } catch {}
  }
  return (
    (n = setTimeout(() => {
      e(), r();
    })),
    typeof requestAnimationFrame == "function" &&
      (t = requestAnimationFrame(() => {
        e(), r();
      })),
    () => r()
  );
}
function ap(e) {
  return (
    queueMicrotask(() => e()),
    () => {
      e = js;
    }
  );
}
var Bu = "isAngularZone",
  Bs = Bu + "_ID",
  cw = 0,
  ee = class e {
    hasPendingMacrotasks = !1;
    hasPendingMicrotasks = !1;
    isStable = !0;
    onUnstable = new pe(!1);
    onMicrotaskEmpty = new pe(!1);
    onStable = new pe(!1);
    onError = new pe(!1);
    constructor(n) {
      let {
        enableLongStackTrace: t = !1,
        shouldCoalesceEventChangeDetection: r = !1,
        shouldCoalesceRunChangeDetection: i = !1,
        scheduleInRootZone: o = Ug,
      } = n;
      if (typeof Zone > "u") throw new D(908, !1);
      Zone.assertZonePatched();
      let s = this;
      (s._nesting = 0),
        (s._outer = s._inner = Zone.current),
        Zone.TaskTrackingZoneSpec &&
          (s._inner = s._inner.fork(new Zone.TaskTrackingZoneSpec())),
        t &&
          Zone.longStackTraceZoneSpec &&
          (s._inner = s._inner.fork(Zone.longStackTraceZoneSpec)),
        (s.shouldCoalesceEventChangeDetection = !i && r),
        (s.shouldCoalesceRunChangeDetection = i),
        (s.callbackScheduled = !1),
        (s.scheduleInRootZone = o),
        fw(s);
    }
    static isInAngularZone() {
      return typeof Zone < "u" && Zone.current.get(Bu) === !0;
    }
    static assertInAngularZone() {
      if (!e.isInAngularZone()) throw new D(909, !1);
    }
    static assertNotInAngularZone() {
      if (e.isInAngularZone()) throw new D(909, !1);
    }
    run(n, t, r) {
      return this._inner.run(n, t, r);
    }
    runTask(n, t, r, i) {
      let o = this._inner,
        s = o.scheduleEventTask("NgZoneEvent: " + i, n, uw, js, js);
      try {
        return o.runTask(s, t, r);
      } finally {
        o.cancelTask(s);
      }
    }
    runGuarded(n, t, r) {
      return this._inner.runGuarded(n, t, r);
    }
    runOutsideAngular(n) {
      return this._outer.run(n);
    }
  },
  uw = {};
function Uu(e) {
  if (e._nesting == 0 && !e.hasPendingMicrotasks && !e.isStable)
    try {
      e._nesting++, e.onMicrotaskEmpty.emit(null);
    } finally {
      if ((e._nesting--, !e.hasPendingMicrotasks))
        try {
          e.runOutsideAngular(() => e.onStable.emit(null));
        } finally {
          e.isStable = !0;
        }
    }
}
function dw(e) {
  if (e.isCheckStableRunning || e.callbackScheduled) return;
  e.callbackScheduled = !0;
  function n() {
    zg(() => {
      (e.callbackScheduled = !1),
        Yc(e),
        (e.isCheckStableRunning = !0),
        Uu(e),
        (e.isCheckStableRunning = !1);
    });
  }
  e.scheduleInRootZone
    ? Zone.root.run(() => {
        n();
      })
    : e._outer.run(() => {
        n();
      }),
    Yc(e);
}
function fw(e) {
  let n = () => {
      dw(e);
    },
    t = cw++;
  e._inner = e._inner.fork({
    name: "angular",
    properties: { [Bu]: !0, [Bs]: t, [Bs + t]: !0 },
    onInvokeTask: (r, i, o, s, a, l) => {
      if (hw(l)) return r.invokeTask(o, s, a, l);
      try {
        return lp(e), r.invokeTask(o, s, a, l);
      } finally {
        ((e.shouldCoalesceEventChangeDetection && s.type === "eventTask") ||
          e.shouldCoalesceRunChangeDetection) &&
          n(),
          cp(e);
      }
    },
    onInvoke: (r, i, o, s, a, l, c) => {
      try {
        return lp(e), r.invoke(o, s, a, l, c);
      } finally {
        e.shouldCoalesceRunChangeDetection &&
          !e.callbackScheduled &&
          !pw(l) &&
          n(),
          cp(e);
      }
    },
    onHasTask: (r, i, o, s) => {
      r.hasTask(o, s),
        i === o &&
          (s.change == "microTask"
            ? ((e._hasPendingMicrotasks = s.microTask), Yc(e), Uu(e))
            : s.change == "macroTask" &&
              (e.hasPendingMacrotasks = s.macroTask));
    },
    onHandleError: (r, i, o, s) => (
      r.handleError(o, s), e.runOutsideAngular(() => e.onError.emit(s)), !1
    ),
  });
}
function Yc(e) {
  e._hasPendingMicrotasks ||
  ((e.shouldCoalesceEventChangeDetection ||
    e.shouldCoalesceRunChangeDetection) &&
    e.callbackScheduled === !0)
    ? (e.hasPendingMicrotasks = !0)
    : (e.hasPendingMicrotasks = !1);
}
function lp(e) {
  e._nesting++, e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
}
function cp(e) {
  e._nesting--, Uu(e);
}
var Us = class {
  hasPendingMicrotasks = !1;
  hasPendingMacrotasks = !1;
  isStable = !0;
  onUnstable = new pe();
  onMicrotaskEmpty = new pe();
  onStable = new pe();
  onError = new pe();
  run(n, t, r) {
    return n.apply(t, r);
  }
  runGuarded(n, t, r) {
    return n.apply(t, r);
  }
  runOutsideAngular(n) {
    return n();
  }
  runTask(n, t, r, i) {
    return n.apply(t, r);
  }
};
function hw(e) {
  return Gg(e, "__ignore_ng_zone__");
}
function pw(e) {
  return Gg(e, "__scheduler_tick__");
}
function Gg(e, n) {
  return !Array.isArray(e) || e.length !== 1 ? !1 : e[0]?.data?.[n] === !0;
}
function gw(e = "zone.js", n) {
  return e === "noop" ? new Us() : e === "zone.js" ? new ee(n) : e;
}
var Qt = class {
    _console = console;
    handleError(n) {
      this._console.error("ERROR", n);
    }
  },
  mw = new I("", {
    providedIn: "root",
    factory: () => {
      let e = v(ee),
        n = v(Qt);
      return (t) => e.runOutsideAngular(() => n.handleError(t));
    },
  });
function up(e, n) {
  return Vp(e, n);
}
function yw(e) {
  return Vp(Lp, e);
}
var qg = ((up.required = yw), up);
function vw() {
  return ga(Le(), ne());
}
function ga(e, n) {
  return new Dt(at(e, n));
}
var Dt = (() => {
  class e {
    nativeElement;
    constructor(t) {
      this.nativeElement = t;
    }
    static __NG_ELEMENT_ID__ = vw;
  }
  return e;
})();
function Wg(e) {
  return (e.flags & 128) === 128;
}
var Qg = (function (e) {
    return (e[(e.OnPush = 0)] = "OnPush"), (e[(e.Default = 1)] = "Default"), e;
  })(Qg || {}),
  Zg = new Map(),
  Dw = 0;
function _w() {
  return Dw++;
}
function Ew(e) {
  Zg.set(e[aa], e);
}
function Jc(e) {
  Zg.delete(e[aa]);
}
var dp = "__ngContext__";
function Kn(e, n) {
  Dn(n) ? ((e[dp] = n[aa]), Ew(n)) : (e[dp] = n);
}
function Kg(e) {
  return Jg(e[xi]);
}
function Yg(e) {
  return Jg(e[mt]);
}
function Jg(e) {
  for (; e !== null && !Kt(e); ) e = e[mt];
  return e;
}
var Xc;
function Xg(e) {
  Xc = e;
}
function ww() {
  if (Xc !== void 0) return Xc;
  if (typeof document < "u") return document;
  throw new D(210, !1);
}
var $u = new I("", { providedIn: "root", factory: () => Cw }),
  Cw = "ng",
  Hu = new I(""),
  Xt = new I("", { providedIn: "platform", factory: () => "unknown" });
var zu = new I(""),
  Gu = new I("", {
    providedIn: "root",
    factory: () =>
      ww().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce") ||
      null,
  });
var bw = "h",
  Iw = "b";
var em = !1,
  Sw = new I("", { providedIn: "root", factory: () => em });
var fp = new Set();
function er(e) {
  fp.has(e) ||
    (fp.add(e),
    performance?.mark?.("mark_feature_usage", { detail: { feature: e } }));
}
var Tr = (function (e) {
    return (
      (e[(e.EarlyRead = 0)] = "EarlyRead"),
      (e[(e.Write = 1)] = "Write"),
      (e[(e.MixedReadWrite = 2)] = "MixedReadWrite"),
      (e[(e.Read = 3)] = "Read"),
      e
    );
  })(Tr || {}),
  tm = (() => {
    class e {
      impl = null;
      execute() {
        this.impl?.execute();
      }
      static ɵprov = b({
        token: e,
        providedIn: "root",
        factory: () => new e(),
      });
    }
    return e;
  })(),
  Mw = [Tr.EarlyRead, Tr.Write, Tr.MixedReadWrite, Tr.Read],
  Tw = (() => {
    class e {
      ngZone = v(ee);
      scheduler = v(jr);
      errorHandler = v(Qt, { optional: !0 });
      sequences = new Set();
      deferredRegistrations = new Set();
      executing = !1;
      execute() {
        this.executing = !0;
        for (let t of Mw)
          for (let r of this.sequences)
            if (!(r.erroredOrDestroyed || !r.hooks[t]))
              try {
                r.pipelinedValue = this.ngZone.runOutsideAngular(() =>
                  r.hooks[t](r.pipelinedValue)
                );
              } catch (i) {
                (r.erroredOrDestroyed = !0), this.errorHandler?.handleError(i);
              }
        this.executing = !1;
        for (let t of this.sequences)
          t.afterRun(), t.once && (this.sequences.delete(t), t.destroy());
        for (let t of this.deferredRegistrations) this.sequences.add(t);
        this.deferredRegistrations.size > 0 && this.scheduler.notify(8),
          this.deferredRegistrations.clear();
      }
      register(t) {
        this.executing
          ? this.deferredRegistrations.add(t)
          : (this.sequences.add(t), this.scheduler.notify(7));
      }
      unregister(t) {
        this.executing && this.sequences.has(t)
          ? ((t.erroredOrDestroyed = !0),
            (t.pipelinedValue = void 0),
            (t.once = !0))
          : (this.sequences.delete(t), this.deferredRegistrations.delete(t));
      }
      static ɵprov = b({
        token: e,
        providedIn: "root",
        factory: () => new e(),
      });
    }
    return e;
  })(),
  eu = class {
    impl;
    hooks;
    once;
    erroredOrDestroyed = !1;
    pipelinedValue = void 0;
    unregisterOnDestroy;
    constructor(n, t, r, i) {
      (this.impl = n),
        (this.hooks = t),
        (this.once = r),
        (this.unregisterOnDestroy = i?.onDestroy(() => this.destroy()));
    }
    afterRun() {
      (this.erroredOrDestroyed = !1), (this.pipelinedValue = void 0);
    }
    destroy() {
      this.impl.unregister(this), this.unregisterOnDestroy?.();
    }
  };
function qu(e, n) {
  !n?.injector && mE(qu);
  let t = n?.injector ?? v(Ye);
  return er("NgAfterNextRender"), Nw(e, t, n, !0);
}
function Aw(e, n) {
  if (e instanceof Function) {
    let t = [void 0, void 0, void 0, void 0];
    return (t[n] = e), t;
  } else return [e.earlyRead, e.write, e.mixedReadWrite, e.read];
}
function Nw(e, n, t, r) {
  let i = n.get(tm);
  i.impl ??= n.get(Tw);
  let o = t?.phase ?? Tr.MixedReadWrite,
    s = t?.manualCleanup !== !0 ? n.get(Vu) : null,
    a = new eu(i.impl, Aw(e, o), r, s);
  return i.impl.register(a), a;
}
var xw = () => null;
function Wu(e, n, t = !1) {
  return xw(e, n, t);
}
var Rt = (function (e) {
  return (
    (e[(e.Emulated = 0)] = "Emulated"),
    (e[(e.None = 2)] = "None"),
    (e[(e.ShadowDom = 3)] = "ShadowDom"),
    e
  );
})(Rt || {});
var gs;
function Rw() {
  if (gs === void 0 && ((gs = null), xe.trustedTypes))
    try {
      gs = xe.trustedTypes.createPolicy("angular#unsafe-bypass", {
        createHTML: (e) => e,
        createScript: (e) => e,
        createScriptURL: (e) => e,
      });
    } catch {}
  return gs;
}
function hp(e) {
  return Rw()?.createScriptURL(e) || e;
}
var $s = class {
  changingThisBreaksApplicationSecurity;
  constructor(n) {
    this.changingThisBreaksApplicationSecurity = n;
  }
  toString() {
    return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${kp})`;
  }
};
function ji(e) {
  return e instanceof $s ? e.changingThisBreaksApplicationSecurity : e;
}
function Qu(e, n) {
  let t = Pw(e);
  if (t != null && t !== n) {
    if (t === "ResourceURL" && n === "URL") return !0;
    throw new Error(`Required a safe ${n}, got a ${t} (see ${kp})`);
  }
  return t === n;
}
function Pw(e) {
  return (e instanceof $s && e.getTypeName()) || null;
}
var Ow = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
function nm(e) {
  return (e = String(e)), e.match(Ow) ? e : "unsafe:" + e;
}
var ma = (function (e) {
  return (
    (e[(e.NONE = 0)] = "NONE"),
    (e[(e.HTML = 1)] = "HTML"),
    (e[(e.STYLE = 2)] = "STYLE"),
    (e[(e.SCRIPT = 3)] = "SCRIPT"),
    (e[(e.URL = 4)] = "URL"),
    (e[(e.RESOURCE_URL = 5)] = "RESOURCE_URL"),
    e
  );
})(ma || {});
function tr(e) {
  let n = im();
  return n ? n.sanitize(ma.URL, e) || "" : Qu(e, "URL") ? ji(e) : nm(na(e));
}
function Fw(e) {
  let n = im();
  if (n) return hp(n.sanitize(ma.RESOURCE_URL, e) || "");
  if (Qu(e, "ResourceURL")) return hp(ji(e));
  throw new D(904, !1);
}
function kw(e, n) {
  return (n === "src" &&
    (e === "embed" ||
      e === "frame" ||
      e === "iframe" ||
      e === "media" ||
      e === "script")) ||
    (n === "href" && (e === "base" || e === "link"))
    ? Fw
    : tr;
}
function rm(e, n, t) {
  return kw(n, t)(e);
}
function im() {
  let e = ne();
  return e && e[Wt].sanitizer;
}
function om(e) {
  return e instanceof Function ? e() : e;
}
var wn = (function (e) {
    return (
      (e[(e.None = 0)] = "None"),
      (e[(e.SignalBased = 1)] = "SignalBased"),
      (e[(e.HasDecoratorInputTransform = 2)] = "HasDecoratorInputTransform"),
      e
    );
  })(wn || {}),
  Pt = (function (e) {
    return (
      (e[(e.Important = 1)] = "Important"),
      (e[(e.DashCase = 2)] = "DashCase"),
      e
    );
  })(Pt || {}),
  Lw;
function Zu(e, n) {
  return Lw(e, n);
}
function Ar(e, n, t, r, i) {
  if (r != null) {
    let o,
      s = !1;
    Kt(r) ? (o = r) : Dn(r) && ((s = !0), (r = r[Zt]));
    let a = xt(r);
    e === 0 && t !== null
      ? i == null
        ? um(n, t, a)
        : Hs(n, t, a, i || null, !0)
      : e === 1 && t !== null
      ? Hs(n, t, a, i || null, !0)
      : e === 2
      ? Jw(n, a, s)
      : e === 3 && n.destroyNode(a),
      o != null && eC(n, e, o, t, i);
  }
}
function Vw(e, n) {
  return e.createText(n);
}
function jw(e, n, t) {
  e.setValue(n, t);
}
function sm(e, n, t) {
  return e.createElement(n, t);
}
function Bw(e, n) {
  am(e, n), (n[Zt] = null), (n[vt] = null);
}
function Uw(e, n, t, r, i, o) {
  (r[Zt] = i), (r[vt] = n), ya(e, r, t, 1, i, o);
}
function am(e, n) {
  n[Wt].changeDetectionScheduler?.notify(10), ya(e, n, n[De], 2, null, null);
}
function $w(e) {
  let n = e[xi];
  if (!n) return Sc(e[z], e);
  for (; n; ) {
    let t = null;
    if (Dn(n)) t = n[xi];
    else {
      let r = n[st];
      r && (t = r);
    }
    if (!t) {
      for (; n && !n[mt] && n !== e; ) Dn(n) && Sc(n[z], n), (n = n[Fe]);
      n === null && (n = e), Dn(n) && Sc(n[z], n), (t = n && n[mt]);
    }
    n = t;
  }
}
function Hw(e, n, t, r) {
  let i = st + r,
    o = t.length;
  r > 0 && (t[i - 1][mt] = n),
    r < o - st
      ? ((n[mt] = t[i]), Qp(t, st + r, n))
      : (t.push(n), (n[mt] = null)),
    (n[Fe] = t);
  let s = n[kr];
  s !== null && t !== s && lm(s, n);
  let a = n[Lr];
  a !== null && a.insertView(e), Uc(n), (n[F] |= 128);
}
function lm(e, n) {
  let t = e[Rs],
    r = n[Fe];
  if (Dn(r)) e[F] |= Ps.HasTransplantedViews;
  else {
    let i = r[Fe][At];
    n[At] !== i && (e[F] |= Ps.HasTransplantedViews);
  }
  t === null ? (e[Rs] = [n]) : t.push(n);
}
function Ku(e, n) {
  let t = e[Rs],
    r = t.indexOf(n);
  t.splice(r, 1);
}
function tu(e, n) {
  if (e.length <= st) return;
  let t = st + n,
    r = e[t];
  if (r) {
    let i = r[kr];
    i !== null && i !== e && Ku(i, r), n > 0 && (e[t - 1][mt] = r[mt]);
    let o = Ss(e, st + n);
    Bw(r[z], r);
    let s = o[Lr];
    s !== null && s.detachView(o[z]),
      (r[Fe] = null),
      (r[mt] = null),
      (r[F] &= -129);
  }
  return r;
}
function cm(e, n) {
  if (!(n[F] & 256)) {
    let t = n[De];
    t.destroyNode && ya(e, n, t, 3, null, null), $w(n);
  }
}
function Sc(e, n) {
  if (n[F] & 256) return;
  let t = Y(null);
  try {
    (n[F] &= -129),
      (n[F] |= 256),
      n[Ke] && nc(n[Ke]),
      Gw(e, n),
      zw(e, n),
      n[z].type === 1 && n[De].destroy();
    let r = n[kr];
    if (r !== null && Kt(n[Fe])) {
      r !== n[Fe] && Ku(r, n);
      let i = n[Lr];
      i !== null && i.detachView(e);
    }
    Jc(n);
  } finally {
    Y(t);
  }
}
function zw(e, n) {
  let t = e.cleanup,
    r = n[As];
  if (t !== null)
    for (let s = 0; s < t.length - 1; s += 2)
      if (typeof t[s] == "string") {
        let a = t[s + 3];
        a >= 0 ? r[a]() : r[-a].unsubscribe(), (s += 2);
      } else {
        let a = r[t[s + 1]];
        t[s].call(a);
      }
  r !== null && (n[As] = null);
  let i = n[vn];
  if (i !== null) {
    n[vn] = null;
    for (let s = 0; s < i.length; s++) {
      let a = i[s];
      a();
    }
  }
  let o = n[Ns];
  if (o !== null) {
    n[Ns] = null;
    for (let s of o) s.destroy();
  }
}
function Gw(e, n) {
  let t;
  if (e != null && (t = e.destroyHooks) != null)
    for (let r = 0; r < t.length; r += 2) {
      let i = n[t[r]];
      if (!(i instanceof Zn)) {
        let o = t[r + 1];
        if (Array.isArray(o))
          for (let s = 0; s < o.length; s += 2) {
            let a = i[o[s]],
              l = o[s + 1];
            Mt(4, a, l);
            try {
              l.call(a);
            } finally {
              Mt(5, a, l);
            }
          }
        else {
          Mt(4, i, o);
          try {
            o.call(i);
          } finally {
            Mt(5, i, o);
          }
        }
      }
    }
}
function qw(e, n, t) {
  return Ww(e, n.parent, t);
}
function Ww(e, n, t) {
  let r = n;
  for (; r !== null && r.type & 168; ) (n = r), (r = n.parent);
  if (r === null) return t[Zt];
  {
    let { componentOffset: i } = r;
    if (i > -1) {
      let { encapsulation: o } = e.data[r.directiveStart + i];
      if (o === Rt.None || o === Rt.Emulated) return null;
    }
    return at(r, t);
  }
}
function Hs(e, n, t, r, i) {
  e.insertBefore(n, t, r, i);
}
function um(e, n, t) {
  e.appendChild(n, t);
}
function pp(e, n, t, r, i) {
  r !== null ? Hs(e, n, t, r, i) : um(e, n, t);
}
function dm(e, n) {
  return e.parentNode(n);
}
function Qw(e, n) {
  return e.nextSibling(n);
}
function Zw(e, n, t) {
  return Yw(e, n, t);
}
function Kw(e, n, t) {
  return e.type & 40 ? at(e, t) : null;
}
var Yw = Kw,
  gp;
function Yu(e, n, t, r) {
  let i = qw(e, r, n),
    o = n[De],
    s = r.parent || n[vt],
    a = Zw(s, r, n);
  if (i != null)
    if (Array.isArray(t))
      for (let l = 0; l < t.length; l++) pp(o, i, t[l], a, !1);
    else pp(o, i, t, a, !1);
  gp !== void 0 && gp(o, r, n, t, i);
}
function Si(e, n) {
  if (n !== null) {
    let t = n.type;
    if (t & 3) return at(n, e);
    if (t & 4) return nu(-1, e[n.index]);
    if (t & 8) {
      let r = n.child;
      if (r !== null) return Si(e, r);
      {
        let i = e[n.index];
        return Kt(i) ? nu(-1, i) : xt(i);
      }
    } else {
      if (t & 128) return Si(e, n.next);
      if (t & 32) return Zu(n, e)() || xt(e[n.index]);
      {
        let r = fm(e, n);
        if (r !== null) {
          if (Array.isArray(r)) return r[0];
          let i = Wn(e[At]);
          return Si(i, r);
        } else return Si(e, n.next);
      }
    }
  }
  return null;
}
function fm(e, n) {
  if (n !== null) {
    let r = e[At][vt],
      i = n.projection;
    return r.projection[i];
  }
  return null;
}
function nu(e, n) {
  let t = st + e + 1;
  if (t < n.length) {
    let r = n[t],
      i = r[z].firstChild;
    if (i !== null) return Si(r, i);
  }
  return n[qn];
}
function Jw(e, n, t) {
  e.removeChild(null, n, t);
}
function Ju(e, n, t, r, i, o, s) {
  for (; t != null; ) {
    if (t.type === 128) {
      t = t.next;
      continue;
    }
    let a = r[t.index],
      l = t.type;
    if (
      (s && n === 0 && (a && Kn(xt(a), r), (t.flags |= 2)),
      (t.flags & 32) !== 32)
    )
      if (l & 8) Ju(e, n, t.child, r, i, o, !1), Ar(n, e, i, a, o);
      else if (l & 32) {
        let c = Zu(t, r),
          u;
        for (; (u = c()); ) Ar(n, e, i, u, o);
        Ar(n, e, i, a, o);
      } else l & 16 ? Xw(e, n, r, t, i, o) : Ar(n, e, i, a, o);
    t = s ? t.projectionNext : t.next;
  }
}
function ya(e, n, t, r, i, o) {
  Ju(t, r, e.firstChild, n, i, o, !1);
}
function Xw(e, n, t, r, i, o) {
  let s = t[At],
    l = s[vt].projection[r.projection];
  if (Array.isArray(l))
    for (let c = 0; c < l.length; c++) {
      let u = l[c];
      Ar(n, e, i, u, o);
    }
  else {
    let c = l,
      u = s[Fe];
    Wg(r) && (c.flags |= 128), Ju(e, n, c, u, i, o, !0);
  }
}
function eC(e, n, t, r, i) {
  let o = t[qn],
    s = xt(t);
  o !== s && Ar(n, e, r, o, i);
  for (let a = st; a < t.length; a++) {
    let l = t[a];
    ya(l[z], l, e, n, r, o);
  }
}
function tC(e, n, t, r, i) {
  if (n) i ? e.addClass(t, r) : e.removeClass(t, r);
  else {
    let o = r.indexOf("-") === -1 ? void 0 : Pt.DashCase;
    i == null
      ? e.removeStyle(t, r, o)
      : (typeof i == "string" &&
          i.endsWith("!important") &&
          ((i = i.slice(0, -10)), (o |= Pt.Important)),
        e.setStyle(t, r, i, o));
  }
}
function nC(e, n, t) {
  e.setAttribute(n, "style", t);
}
function hm(e, n, t) {
  t === "" ? e.removeAttribute(n, "class") : e.setAttribute(n, "class", t);
}
function pm(e, n, t) {
  let { mergedAttrs: r, classes: i, styles: o } = t;
  r !== null && zc(e, n, r),
    i !== null && hm(e, n, i),
    o !== null && nC(e, n, o);
}
function rC(e, n, t) {
  let r = e.length;
  for (;;) {
    let i = e.indexOf(n, t);
    if (i === -1) return i;
    if (i === 0 || e.charCodeAt(i - 1) <= 32) {
      let o = n.length;
      if (i + o === r || e.charCodeAt(i + o) <= 32) return i;
    }
    t = i + 1;
  }
}
var gm = "ng-template";
function iC(e, n, t, r) {
  let i = 0;
  if (r) {
    for (; i < n.length && typeof n[i] == "string"; i += 2)
      if (n[i] === "class" && rC(n[i + 1].toLowerCase(), t, 0) !== -1)
        return !0;
  } else if (Xu(e)) return !1;
  if (((i = n.indexOf(1, i)), i > -1)) {
    let o;
    for (; ++i < n.length && typeof (o = n[i]) == "string"; )
      if (o.toLowerCase() === t) return !0;
  }
  return !1;
}
function Xu(e) {
  return e.type === 4 && e.value !== gm;
}
function oC(e, n, t) {
  let r = e.type === 4 && !t ? gm : e.value;
  return n === r;
}
function sC(e, n, t) {
  let r = 4,
    i = e.attrs,
    o = i !== null ? cC(i) : 0,
    s = !1;
  for (let a = 0; a < n.length; a++) {
    let l = n[a];
    if (typeof l == "number") {
      if (!s && !gt(r) && !gt(l)) return !1;
      if (s && gt(l)) continue;
      (s = !1), (r = l | (r & 1));
      continue;
    }
    if (!s)
      if (r & 4) {
        if (
          ((r = 2 | (r & 1)),
          (l !== "" && !oC(e, l, t)) || (l === "" && n.length === 1))
        ) {
          if (gt(r)) return !1;
          s = !0;
        }
      } else if (r & 8) {
        if (i === null || !iC(e, i, l, t)) {
          if (gt(r)) return !1;
          s = !0;
        }
      } else {
        let c = n[++a],
          u = aC(l, i, Xu(e), t);
        if (u === -1) {
          if (gt(r)) return !1;
          s = !0;
          continue;
        }
        if (c !== "") {
          let d;
          if (
            (u > o ? (d = "") : (d = i[u + 1].toLowerCase()), r & 2 && c !== d)
          ) {
            if (gt(r)) return !1;
            s = !0;
          }
        }
      }
  }
  return gt(r) || s;
}
function gt(e) {
  return (e & 1) === 0;
}
function aC(e, n, t, r) {
  if (n === null) return -1;
  let i = 0;
  if (r || !t) {
    let o = !1;
    for (; i < n.length; ) {
      let s = n[i];
      if (s === e) return i;
      if (s === 3 || s === 6) o = !0;
      else if (s === 1 || s === 2) {
        let a = n[++i];
        for (; typeof a == "string"; ) a = n[++i];
        continue;
      } else {
        if (s === 4) break;
        if (s === 0) {
          i += 4;
          continue;
        }
      }
      i += o ? 1 : 2;
    }
    return -1;
  } else return uC(n, e);
}
function lC(e, n, t = !1) {
  for (let r = 0; r < n.length; r++) if (sC(e, n[r], t)) return !0;
  return !1;
}
function cC(e) {
  for (let n = 0; n < e.length; n++) {
    let t = e[n];
    if (Ng(t)) return n;
  }
  return e.length;
}
function uC(e, n) {
  let t = e.indexOf(4);
  if (t > -1)
    for (t++; t < e.length; ) {
      let r = e[t];
      if (typeof r == "number") return -1;
      if (r === n) return t;
      t++;
    }
  return -1;
}
function mp(e, n) {
  return e ? ":not(" + n.trim() + ")" : n;
}
function dC(e) {
  let n = e[0],
    t = 1,
    r = 2,
    i = "",
    o = !1;
  for (; t < e.length; ) {
    let s = e[t];
    if (typeof s == "string")
      if (r & 2) {
        let a = e[++t];
        i += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
      } else r & 8 ? (i += "." + s) : r & 4 && (i += " " + s);
    else
      i !== "" && !gt(s) && ((n += mp(o, i)), (i = "")),
        (r = s),
        (o = o || !gt(r));
    t++;
  }
  return i !== "" && (n += mp(o, i)), n;
}
function fC(e) {
  return e.map(dC).join(",");
}
function hC(e) {
  let n = [],
    t = [],
    r = 1,
    i = 2;
  for (; r < e.length; ) {
    let o = e[r];
    if (typeof o == "string")
      i === 2 ? o !== "" && n.push(o, e[++r]) : i === 8 && t.push(o);
    else {
      if (!gt(i)) break;
      i = o;
    }
    r++;
  }
  return { attrs: n, classes: t };
}
var Sn = {};
function A(e = 1) {
  mm(ke(), ne(), zr() + e, !1);
}
function mm(e, n, t, r) {
  if (!r)
    if ((n[F] & 3) === 3) {
      let o = e.preOrderCheckHooks;
      o !== null && Es(n, o, t);
    } else {
      let o = e.preOrderHooks;
      o !== null && ws(n, o, 0, t);
    }
  Qn(t);
}
function C(e, n = $.Default) {
  let t = ne();
  if (t === null) return M(e, n);
  let r = Le();
  return Lg(r, t, Re(e), n);
}
function ym() {
  let e = "invalid";
  throw new Error(e);
}
function vm(e, n, t, r, i, o) {
  let s = Y(null);
  try {
    let a = null;
    i & wn.SignalBased && (a = n[r][We]),
      a !== null && a.transformFn !== void 0 && (o = a.transformFn(o)),
      i & wn.HasDecoratorInputTransform &&
        (o = e.inputTransforms[r].call(n, o)),
      e.setInput !== null ? e.setInput(n, a, o, t, r) : cg(n, a, r, o);
  } finally {
    Y(s);
  }
}
function pC(e, n) {
  let t = e.hostBindingOpCodes;
  if (t !== null)
    try {
      for (let r = 0; r < t.length; r++) {
        let i = t[r];
        if (i < 0) Qn(~i);
        else {
          let o = i,
            s = t[++r],
            a = t[++r];
          jE(s, o);
          let l = n[o];
          a(2, l);
        }
      }
    } finally {
      Qn(-1);
    }
}
function va(e, n, t, r, i, o, s, a, l, c, u) {
  let d = n.blueprint.slice();
  return (
    (d[Zt] = i),
    (d[F] = r | 4 | 128 | 8 | 64 | 1024),
    (c !== null || (e && e[F] & 2048)) && (d[F] |= 2048),
    gg(d),
    (d[Fe] = d[Hr] = e),
    (d[yt] = t),
    (d[Wt] = s || (e && e[Wt])),
    (d[De] = a || (e && e[De])),
    (d[Fr] = l || (e && e[Fr]) || null),
    (d[vt] = o),
    (d[aa] = _w()),
    (d[Ts] = u),
    (d[sg] = c),
    (d[At] = n.type == 2 ? e[At] : d),
    d
  );
}
function Da(e, n, t, r, i) {
  let o = e.data[n];
  if (o === null) (o = gC(e, n, t, r, i)), VE() && (o.flags |= 32);
  else if (o.type & 64) {
    (o.type = t), (o.value = r), (o.attrs = i);
    let s = OE();
    o.injectorIndex = s === null ? -1 : s.injectorIndex;
  }
  return Vi(o, !0), o;
}
function gC(e, n, t, r, i) {
  let o = vg(),
    s = Dg(),
    a = s ? o : o && o.parent,
    l = (e.data[n] = _C(e, a, t, n, r, i));
  return (
    e.firstChild === null && (e.firstChild = l),
    o !== null &&
      (s
        ? o.child == null && l.parent !== null && (o.child = l)
        : o.next === null && ((o.next = l), (l.prev = o))),
    l
  );
}
function Dm(e, n, t, r) {
  if (t === 0) return -1;
  let i = n.length;
  for (let o = 0; o < t; o++) n.push(r), e.blueprint.push(r), e.data.push(null);
  return i;
}
function _m(e, n, t, r, i) {
  let o = zr(),
    s = r & 2;
  try {
    Qn(-1), s && n.length > Nt && mm(e, n, Nt, !1), Mt(s ? 2 : 0, i), t(r, i);
  } finally {
    Qn(o), Mt(s ? 3 : 1, i);
  }
}
function Em(e, n, t) {
  if (lg(n)) {
    let r = Y(null);
    try {
      let i = n.directiveStart,
        o = n.directiveEnd;
      for (let s = i; s < o; s++) {
        let a = e.data[s];
        if (a.contentQueries) {
          let l = t[s];
          a.contentQueries(1, l, s);
        }
      }
    } finally {
      Y(r);
    }
  }
}
function wm(e, n, t) {
  yg() && (SC(e, n, t, at(t, n)), (t.flags & 64) === 64 && Mm(e, n, t));
}
function Cm(e, n, t = at) {
  let r = n.localNames;
  if (r !== null) {
    let i = n.index + 1;
    for (let o = 0; o < r.length; o += 2) {
      let s = r[o + 1],
        a = s === -1 ? t(n, e) : e[s];
      e[i++] = a;
    }
  }
}
function bm(e) {
  let n = e.tView;
  return n === null || n.incompleteFirstPass
    ? (e.tView = ed(
        1,
        null,
        e.template,
        e.decls,
        e.vars,
        e.directiveDefs,
        e.pipeDefs,
        e.viewQuery,
        e.schemas,
        e.consts,
        e.id
      ))
    : n;
}
function ed(e, n, t, r, i, o, s, a, l, c, u) {
  let d = Nt + r,
    h = d + i,
    f = mC(d, h),
    m = typeof c == "function" ? c() : c;
  return (f[z] = {
    type: e,
    blueprint: f,
    template: t,
    queries: null,
    viewQuery: a,
    declTNode: n,
    data: f.slice().fill(null, d),
    bindingStartIndex: d,
    expandoStartIndex: h,
    hostBindingOpCodes: null,
    firstCreatePass: !0,
    firstUpdatePass: !0,
    staticViewQueries: !1,
    staticContentQueries: !1,
    preOrderHooks: null,
    preOrderCheckHooks: null,
    contentHooks: null,
    contentCheckHooks: null,
    viewHooks: null,
    viewCheckHooks: null,
    destroyHooks: null,
    cleanup: null,
    contentQueries: null,
    components: null,
    directiveRegistry: typeof o == "function" ? o() : o,
    pipeRegistry: typeof s == "function" ? s() : s,
    firstChild: null,
    schemas: l,
    consts: m,
    incompleteFirstPass: !1,
    ssrId: u,
  });
}
function mC(e, n) {
  let t = [];
  for (let r = 0; r < n; r++) t.push(r < e ? null : Sn);
  return t;
}
function yC(e, n, t, r) {
  let o = r.get(Sw, em) || t === Rt.ShadowDom,
    s = e.selectRootElement(n, o);
  return vC(s), s;
}
function vC(e) {
  DC(e);
}
var DC = () => null;
function _C(e, n, t, r, i, o) {
  let s = n ? n.injectorIndex : -1,
    a = 0;
  return (
    xE() && (a |= 128),
    {
      type: t,
      index: r,
      insertBeforeIndex: null,
      injectorIndex: s,
      directiveStart: -1,
      directiveEnd: -1,
      directiveStylingLast: -1,
      componentOffset: -1,
      propertyBindings: null,
      flags: a,
      providerIndexes: 0,
      value: i,
      attrs: o,
      mergedAttrs: null,
      localNames: null,
      initialInputs: void 0,
      inputs: null,
      outputs: null,
      tView: null,
      next: null,
      prev: null,
      projectionNext: null,
      child: null,
      parent: n,
      projection: null,
      styles: null,
      stylesWithoutHost: null,
      residualStyles: void 0,
      classes: null,
      classesWithoutHost: null,
      residualClasses: void 0,
      classBindings: 0,
      styleBindings: 0,
    }
  );
}
function yp(e, n, t, r, i) {
  for (let o in n) {
    if (!n.hasOwnProperty(o)) continue;
    let s = n[o];
    if (s === void 0) continue;
    r ??= {};
    let a,
      l = wn.None;
    Array.isArray(s) ? ((a = s[0]), (l = s[1])) : (a = s);
    let c = o;
    if (i !== null) {
      if (!i.hasOwnProperty(o)) continue;
      c = i[o];
    }
    e === 0 ? vp(r, t, c, a, l) : vp(r, t, c, a);
  }
  return r;
}
function vp(e, n, t, r, i) {
  let o;
  e.hasOwnProperty(t) ? (o = e[t]).push(n, r) : (o = e[t] = [n, r]),
    i !== void 0 && o.push(i);
}
function EC(e, n, t) {
  let r = n.directiveStart,
    i = n.directiveEnd,
    o = e.data,
    s = n.attrs,
    a = [],
    l = null,
    c = null;
  for (let u = r; u < i; u++) {
    let d = o[u],
      h = t ? t.get(d) : null,
      f = h ? h.inputs : null,
      m = h ? h.outputs : null;
    (l = yp(0, d.inputs, u, l, f)), (c = yp(1, d.outputs, u, c, m));
    let y = l !== null && s !== null && !Xu(n) ? LC(l, u, s) : null;
    a.push(y);
  }
  l !== null &&
    (l.hasOwnProperty("class") && (n.flags |= 8),
    l.hasOwnProperty("style") && (n.flags |= 16)),
    (n.initialInputs = a),
    (n.inputs = l),
    (n.outputs = c);
}
function wC(e) {
  return e === "class"
    ? "className"
    : e === "for"
    ? "htmlFor"
    : e === "formaction"
    ? "formAction"
    : e === "innerHtml"
    ? "innerHTML"
    : e === "readonly"
    ? "readOnly"
    : e === "tabindex"
    ? "tabIndex"
    : e;
}
function td(e, n, t, r, i, o, s, a) {
  let l = at(n, t),
    c = n.inputs,
    u;
  !a && c != null && (u = c[r])
    ? (nd(e, t, u, r, i), la(n) && CC(t, n.index))
    : n.type & 3
    ? ((r = wC(r)),
      (i = s != null ? s(i, n.value || "", r) : i),
      o.setProperty(l, r, i))
    : n.type & 12;
}
function CC(e, n) {
  let t = In(n, e);
  t[F] & 16 || (t[F] |= 64);
}
function Im(e, n, t, r) {
  if (yg()) {
    let i = r === null ? null : { "": -1 },
      o = TC(e, t),
      s,
      a;
    o === null ? (s = a = null) : ([s, a] = o),
      s !== null && Sm(e, n, t, s, i, a),
      i && AC(t, r, i);
  }
  t.mergedAttrs = Ri(t.mergedAttrs, t.attrs);
}
function Sm(e, n, t, r, i, o) {
  for (let c = 0; c < r.length; c++) Wc(Vs(t, n), e, r[c].type);
  xC(t, e.data.length, r.length);
  for (let c = 0; c < r.length; c++) {
    let u = r[c];
    u.providersResolver && u.providersResolver(u);
  }
  let s = !1,
    a = !1,
    l = Dm(e, n, r.length, null);
  for (let c = 0; c < r.length; c++) {
    let u = r[c];
    (t.mergedAttrs = Ri(t.mergedAttrs, u.hostAttrs)),
      RC(e, t, n, l, u),
      NC(l, u, i),
      u.contentQueries !== null && (t.flags |= 4),
      (u.hostBindings !== null || u.hostAttrs !== null || u.hostVars !== 0) &&
        (t.flags |= 64);
    let d = u.type.prototype;
    !s &&
      (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
      ((e.preOrderHooks ??= []).push(t.index), (s = !0)),
      !a &&
        (d.ngOnChanges || d.ngDoCheck) &&
        ((e.preOrderCheckHooks ??= []).push(t.index), (a = !0)),
      l++;
  }
  EC(e, t, o);
}
function bC(e, n, t, r, i) {
  let o = i.hostBindings;
  if (o) {
    let s = e.hostBindingOpCodes;
    s === null && (s = e.hostBindingOpCodes = []);
    let a = ~n.index;
    IC(s) != a && s.push(a), s.push(t, r, o);
  }
}
function IC(e) {
  let n = e.length;
  for (; n > 0; ) {
    let t = e[--n];
    if (typeof t == "number" && t < 0) return t;
  }
  return 0;
}
function SC(e, n, t, r) {
  let i = t.directiveStart,
    o = t.directiveEnd;
  la(t) && PC(n, t, e.data[i + t.componentOffset]),
    e.firstCreatePass || Vs(t, n),
    Kn(r, n);
  let s = t.initialInputs;
  for (let a = i; a < o; a++) {
    let l = e.data[a],
      c = Vr(n, e, a, t);
    if ((Kn(c, n), s !== null && kC(n, a - i, c, l, t, s), En(l))) {
      let u = In(t.index, n);
      u[yt] = Vr(n, e, a, t);
    }
  }
}
function Mm(e, n, t) {
  let r = t.directiveStart,
    i = t.directiveEnd,
    o = t.index,
    s = BE();
  try {
    Qn(o);
    for (let a = r; a < i; a++) {
      let l = e.data[a],
        c = n[a];
      Hc(a),
        (l.hostBindings !== null || l.hostVars !== 0 || l.hostAttrs !== null) &&
          MC(l, c);
    }
  } finally {
    Qn(-1), Hc(s);
  }
}
function MC(e, n) {
  e.hostBindings !== null && e.hostBindings(1, n);
}
function TC(e, n) {
  let t = e.directiveRegistry,
    r = null,
    i = null;
  if (t)
    for (let o = 0; o < t.length; o++) {
      let s = t[o];
      if (lC(n, s.selectors, !1))
        if ((r || (r = []), En(s)))
          if (s.findHostDirectiveDefs !== null) {
            let a = [];
            (i = i || new Map()),
              s.findHostDirectiveDefs(s, a, i),
              r.unshift(...a, s);
            let l = a.length;
            ru(e, n, l);
          } else r.unshift(s), ru(e, n, 0);
        else
          (i = i || new Map()), s.findHostDirectiveDefs?.(s, r, i), r.push(s);
    }
  return r === null ? null : [r, i];
}
function ru(e, n, t) {
  (n.componentOffset = t), (e.components ??= []).push(n.index);
}
function AC(e, n, t) {
  if (n) {
    let r = (e.localNames = []);
    for (let i = 0; i < n.length; i += 2) {
      let o = t[n[i + 1]];
      if (o == null) throw new D(-301, !1);
      r.push(n[i], o);
    }
  }
}
function NC(e, n, t) {
  if (t) {
    if (n.exportAs)
      for (let r = 0; r < n.exportAs.length; r++) t[n.exportAs[r]] = e;
    En(n) && (t[""] = e);
  }
}
function xC(e, n, t) {
  (e.flags |= 1),
    (e.directiveStart = n),
    (e.directiveEnd = n + t),
    (e.providerIndexes = n);
}
function RC(e, n, t, r, i) {
  e.data[r] = i;
  let o = i.factory || (i.factory = Gn(i.type, !0)),
    s = new Zn(o, En(i), C);
  (e.blueprint[r] = s), (t[r] = s), bC(e, n, r, Dm(e, t, i.hostVars, Sn), i);
}
function Tm(e) {
  let n = 16;
  return e.signals ? (n = 4096) : e.onPush && (n = 64), n;
}
function PC(e, n, t) {
  let r = at(n, e),
    i = bm(t),
    o = e[Wt].rendererFactory,
    s = _a(
      e,
      va(
        e,
        i,
        null,
        Tm(t),
        r,
        n,
        null,
        o.createRenderer(r, t),
        null,
        null,
        null
      )
    );
  e[n.index] = s;
}
function OC(e, n, t, r, i, o) {
  let s = at(e, n);
  FC(n[De], s, o, e.value, t, r, i);
}
function FC(e, n, t, r, i, o, s) {
  if (o == null) e.removeAttribute(n, i, t);
  else {
    let a = s == null ? na(o) : s(o, r || "", i);
    e.setAttribute(n, i, a, t);
  }
}
function kC(e, n, t, r, i, o) {
  let s = o[n];
  if (s !== null)
    for (let a = 0; a < s.length; ) {
      let l = s[a++],
        c = s[a++],
        u = s[a++],
        d = s[a++];
      vm(r, t, l, c, u, d);
    }
}
function LC(e, n, t) {
  let r = null,
    i = 0;
  for (; i < t.length; ) {
    let o = t[i];
    if (o === 0) {
      i += 4;
      continue;
    } else if (o === 5) {
      i += 2;
      continue;
    }
    if (typeof o == "number") break;
    if (e.hasOwnProperty(o)) {
      r === null && (r = []);
      let s = e[o];
      for (let a = 0; a < s.length; a += 3)
        if (s[a] === n) {
          r.push(o, s[a + 1], s[a + 2], t[i + 1]);
          break;
        }
    }
    i += 2;
  }
  return r;
}
function Am(e, n, t, r) {
  return [e, !0, 0, n, null, r, null, t, null, null];
}
function Nm(e, n) {
  let t = e.contentQueries;
  if (t !== null) {
    let r = Y(null);
    try {
      for (let i = 0; i < t.length; i += 2) {
        let o = t[i],
          s = t[i + 1];
        if (s !== -1) {
          let a = e.data[s];
          wg(o), a.contentQueries(2, n[s], s);
        }
      }
    } finally {
      Y(r);
    }
  }
}
function _a(e, n) {
  return e[xi] ? (e[Xh][mt] = n) : (e[xi] = n), (e[Xh] = n), n;
}
function iu(e, n, t) {
  wg(0);
  let r = Y(null);
  try {
    n(e, t);
  } finally {
    Y(r);
  }
}
function VC(e) {
  return (e[As] ??= []);
}
function jC(e) {
  return (e.cleanup ??= []);
}
function xm(e, n) {
  let t = e[Fr],
    r = t ? t.get(Qt, null) : null;
  r && r.handleError(n);
}
function nd(e, n, t, r, i) {
  for (let o = 0; o < t.length; ) {
    let s = t[o++],
      a = t[o++],
      l = t[o++],
      c = n[s],
      u = e.data[s];
    vm(u, c, r, a, l, i);
  }
}
function BC(e, n, t) {
  let r = hg(n, e);
  jw(e[De], r, t);
}
function UC(e, n) {
  let t = In(n, e),
    r = t[z];
  $C(r, t);
  let i = t[Zt];
  i !== null && t[Ts] === null && (t[Ts] = Wu(i, t[Fr])), rd(r, t, t[yt]);
}
function $C(e, n) {
  for (let t = n.length; t < e.blueprint.length; t++) n.push(e.blueprint[t]);
}
function rd(e, n, t) {
  xu(n);
  try {
    let r = e.viewQuery;
    r !== null && iu(1, r, t);
    let i = e.template;
    i !== null && _m(e, n, i, 1, t),
      e.firstCreatePass && (e.firstCreatePass = !1),
      n[Lr]?.finishViewCreation(e),
      e.staticContentQueries && Nm(e, n),
      e.staticViewQueries && iu(2, e.viewQuery, t);
    let o = e.components;
    o !== null && HC(n, o);
  } catch (r) {
    throw (
      (e.firstCreatePass &&
        ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
      r)
    );
  } finally {
    (n[F] &= -5), Ru();
  }
}
function HC(e, n) {
  for (let t = 0; t < n.length; t++) UC(e, n[t]);
}
function zC(e, n, t, r) {
  let i = Y(null);
  try {
    let o = n.tView,
      a = e[F] & 4096 ? 4096 : 16,
      l = va(
        e,
        o,
        t,
        a,
        null,
        n,
        null,
        null,
        r?.injector ?? null,
        r?.embeddedViewInjector ?? null,
        r?.dehydratedView ?? null
      ),
      c = e[n.index];
    l[kr] = c;
    let u = e[Lr];
    return u !== null && (l[Lr] = u.createEmbeddedView(o)), rd(o, l, t), l;
  } finally {
    Y(i);
  }
}
function Dp(e, n) {
  return !n || n.firstChild === null || Wg(e);
}
function GC(e, n, t, r = !0) {
  let i = n[z];
  if ((Hw(i, n, e, t), r)) {
    let s = nu(t, e),
      a = n[De],
      l = dm(a, e[qn]);
    l !== null && Uw(i, e[vt], a, n, l, s);
  }
  let o = n[Ts];
  o !== null && o.firstChild !== null && (o.firstChild = null);
}
function zs(e, n, t, r, i = !1) {
  for (; t !== null; ) {
    if (t.type === 128) {
      t = i ? t.projectionNext : t.next;
      continue;
    }
    let o = n[t.index];
    o !== null && r.push(xt(o)), Kt(o) && qC(o, r);
    let s = t.type;
    if (s & 8) zs(e, n, t.child, r);
    else if (s & 32) {
      let a = Zu(t, n),
        l;
      for (; (l = a()); ) r.push(l);
    } else if (s & 16) {
      let a = fm(n, t);
      if (Array.isArray(a)) r.push(...a);
      else {
        let l = Wn(n[At]);
        zs(l[z], l, a, r, !0);
      }
    }
    t = i ? t.projectionNext : t.next;
  }
  return r;
}
function qC(e, n) {
  for (let t = st; t < e.length; t++) {
    let r = e[t],
      i = r[z].firstChild;
    i !== null && zs(r[z], r, i, n);
  }
  e[qn] !== e[Zt] && n.push(e[qn]);
}
var Rm = [];
function WC(e) {
  return e[Ke] ?? QC(e);
}
function QC(e) {
  let n = Rm.pop() ?? Object.create(KC);
  return (n.lView = e), n;
}
function ZC(e) {
  e.lView[Ke] !== e && ((e.lView = null), Rm.push(e));
}
var KC = q(w({}, Ei), {
  consumerIsAlwaysLive: !0,
  consumerMarkedDirty: (e) => {
    ua(e.lView);
  },
  consumerOnSignalRead() {
    this.lView[Ke] = this;
  },
});
function YC(e) {
  let n = e[Ke] ?? Object.create(JC);
  return (n.lView = e), n;
}
var JC = q(w({}, Ei), {
  consumerIsAlwaysLive: !0,
  consumerMarkedDirty: (e) => {
    let n = Wn(e.lView);
    for (; n && !Pm(n[z]); ) n = Wn(n);
    n && Nu(n);
  },
  consumerOnSignalRead() {
    this.lView[Ke] = this;
  },
});
function Pm(e) {
  return e.type !== 2;
}
function Om(e) {
  if (e[Ns] === null) return;
  let n = !0;
  for (; n; ) {
    let t = !1;
    for (let r of e[Ns])
      r.dirty &&
        ((t = !0),
        r.zone === null || Zone.current === r.zone
          ? r.run()
          : r.zone.run(() => r.run()));
    n = t && !!(e[F] & 8192);
  }
}
var XC = 100;
function Fm(e, n = !0, t = 0) {
  let i = e[Wt].rendererFactory,
    o = !1;
  o || i.begin?.();
  try {
    eb(e, t);
  } catch (s) {
    throw (n && xm(e, s), s);
  } finally {
    o || i.end?.();
  }
}
function eb(e, n) {
  let t = _g();
  try {
    tp(!0), ou(e, n);
    let r = 0;
    for (; ca(e); ) {
      if (r === XC) throw new D(103, !1);
      r++, ou(e, 1);
    }
  } finally {
    tp(t);
  }
}
function tb(e, n, t, r) {
  let i = n[F];
  if ((i & 256) === 256) return;
  let o = !1,
    s = !1;
  xu(n);
  let a = !0,
    l = null,
    c = null;
  o ||
    (Pm(e)
      ? ((c = WC(n)), (l = Uo(c)))
      : dh() === null
      ? ((a = !1), (c = YC(n)), (l = Uo(c)))
      : n[Ke] && (nc(n[Ke]), (n[Ke] = null)));
  try {
    gg(n), kE(e.bindingStartIndex), t !== null && _m(e, n, t, 2, r);
    let u = (i & 3) === 3;
    if (!o)
      if (u) {
        let f = e.preOrderCheckHooks;
        f !== null && Es(n, f, null);
      } else {
        let f = e.preOrderHooks;
        f !== null && ws(n, f, 0, null), Cc(n, 0);
      }
    if (
      (s || nb(n), Om(n), km(n, 0), e.contentQueries !== null && Nm(e, n), !o)
    )
      if (u) {
        let f = e.contentCheckHooks;
        f !== null && Es(n, f);
      } else {
        let f = e.contentHooks;
        f !== null && ws(n, f, 1), Cc(n, 1);
      }
    pC(e, n);
    let d = e.components;
    d !== null && Vm(n, d, 0);
    let h = e.viewQuery;
    if ((h !== null && iu(2, h, r), !o))
      if (u) {
        let f = e.viewCheckHooks;
        f !== null && Es(n, f);
      } else {
        let f = e.viewHooks;
        f !== null && ws(n, f, 2), Cc(n, 2);
      }
    if ((e.firstUpdatePass === !0 && (e.firstUpdatePass = !1), n[wc])) {
      for (let f of n[wc]) f();
      n[wc] = null;
    }
    o || (n[F] &= -73);
  } catch (u) {
    throw (o || ua(n), u);
  } finally {
    c !== null && (ec(c, l), a && ZC(c)), Ru();
  }
}
function km(e, n) {
  for (let t = Kg(e); t !== null; t = Yg(t))
    for (let r = st; r < t.length; r++) {
      let i = t[r];
      Lm(i, n);
    }
}
function nb(e) {
  for (let n = Kg(e); n !== null; n = Yg(n)) {
    if (!(n[F] & Ps.HasTransplantedViews)) continue;
    let t = n[Rs];
    for (let r = 0; r < t.length; r++) {
      let i = t[r];
      Nu(i);
    }
  }
}
function rb(e, n, t) {
  let r = In(n, e);
  Lm(r, t);
}
function Lm(e, n) {
  Au(e) && ou(e, n);
}
function ou(e, n) {
  let r = e[z],
    i = e[F],
    o = e[Ke],
    s = !!(n === 0 && i & 16);
  if (
    ((s ||= !!(i & 64 && n === 0)),
    (s ||= !!(i & 1024)),
    (s ||= !!(o?.dirty && tc(o))),
    (s ||= !1),
    o && (o.dirty = !1),
    (e[F] &= -9217),
    s)
  )
    tb(r, e, r.template, e[yt]);
  else if (i & 8192) {
    Om(e), km(e, 1);
    let a = r.components;
    a !== null && Vm(e, a, 1);
  }
}
function Vm(e, n, t) {
  for (let r = 0; r < n.length; r++) rb(e, n[r], t);
}
function id(e, n) {
  let t = _g() ? 64 : 1088;
  for (e[Wt].changeDetectionScheduler?.notify(n); e; ) {
    e[F] |= t;
    let r = Wn(e);
    if (jc(e) && !r) return e;
    e = r;
  }
  return null;
}
var Yn = class {
    _lView;
    _cdRefInjectingView;
    notifyErrorHandler;
    _appRef = null;
    _attachedToViewContainer = !1;
    get rootNodes() {
      let n = this._lView,
        t = n[z];
      return zs(t, n, t.firstChild, []);
    }
    constructor(n, t, r = !0) {
      (this._lView = n),
        (this._cdRefInjectingView = t),
        (this.notifyErrorHandler = r);
    }
    get context() {
      return this._lView[yt];
    }
    get dirty() {
      return !!(this._lView[F] & 9280) || !!this._lView[Ke]?.dirty;
    }
    set context(n) {
      this._lView[yt] = n;
    }
    get destroyed() {
      return (this._lView[F] & 256) === 256;
    }
    destroy() {
      if (this._appRef) this._appRef.detachView(this);
      else if (this._attachedToViewContainer) {
        let n = this._lView[Fe];
        if (Kt(n)) {
          let t = n[xs],
            r = t ? t.indexOf(this) : -1;
          r > -1 && (tu(n, r), Ss(t, r));
        }
        this._attachedToViewContainer = !1;
      }
      cm(this._lView[z], this._lView);
    }
    onDestroy(n) {
      mg(this._lView, n);
    }
    markForCheck() {
      id(this._cdRefInjectingView || this._lView, 4);
    }
    markForRefresh() {
      Nu(this._cdRefInjectingView || this._lView);
    }
    detach() {
      this._lView[F] &= -129;
    }
    reattach() {
      Uc(this._lView), (this._lView[F] |= 128);
    }
    detectChanges() {
      (this._lView[F] |= 1024), Fm(this._lView, this.notifyErrorHandler);
    }
    checkNoChanges() {}
    attachToViewContainerRef() {
      if (this._appRef) throw new D(902, !1);
      this._attachedToViewContainer = !0;
    }
    detachFromAppRef() {
      this._appRef = null;
      let n = jc(this._lView),
        t = this._lView[kr];
      t !== null && !n && Ku(t, this._lView), am(this._lView[z], this._lView);
    }
    attachToAppRef(n) {
      if (this._attachedToViewContainer) throw new D(902, !1);
      this._appRef = n;
      let t = jc(this._lView),
        r = this._lView[kr];
      r !== null && !t && lm(r, this._lView), Uc(this._lView);
    }
  },
  Ea = (() => {
    class e {
      static __NG_ELEMENT_ID__ = sb;
    }
    return e;
  })(),
  ib = Ea,
  ob = class extends ib {
    _declarationLView;
    _declarationTContainer;
    elementRef;
    constructor(n, t, r) {
      super(),
        (this._declarationLView = n),
        (this._declarationTContainer = t),
        (this.elementRef = r);
    }
    get ssrId() {
      return this._declarationTContainer.tView?.ssrId || null;
    }
    createEmbeddedView(n, t) {
      return this.createEmbeddedViewImpl(n, t);
    }
    createEmbeddedViewImpl(n, t, r) {
      let i = zC(this._declarationLView, this._declarationTContainer, n, {
        embeddedViewInjector: t,
        dehydratedView: r,
      });
      return new Yn(i);
    }
  };
function sb() {
  return ab(Le(), ne());
}
function ab(e, n) {
  return e.type & 4 ? new ob(n, e, ga(e, n)) : null;
}
var su = class {
    resolveComponentFactory(n) {
      throw Error(`No component factory found for ${Pe(n)}.`);
    }
  },
  Br = class {
    static NULL = new su();
  },
  Cn = class {},
  Pi = class {},
  au = class {},
  Gs = class {},
  bn = class {},
  Ft = (() => {
    class e {
      destroyNode = null;
      static __NG_ELEMENT_ID__ = () => lb();
    }
    return e;
  })();
function lb() {
  let e = ne(),
    n = Le(),
    t = In(n.index, e);
  return (Dn(t) ? t : e)[De];
}
var cb = (() => {
  class e {
    static ɵprov = b({ token: e, providedIn: "root", factory: () => null });
  }
  return e;
})();
function lu(e, n, t) {
  let r = t ? e.styles : null,
    i = t ? e.classes : null,
    o = 0;
  if (n !== null)
    for (let s = 0; s < n.length; s++) {
      let a = n[s];
      if (typeof a == "number") o = a;
      else if (o == 1) i = Wh(i, a);
      else if (o == 2) {
        let l = a,
          c = n[++s];
        r = Wh(r, l + ": " + c + ";");
      }
    }
  t ? (e.styles = r) : (e.stylesWithoutHost = r),
    t ? (e.classes = i) : (e.classesWithoutHost = i);
}
var qs = class extends Br {
  ngModule;
  constructor(n) {
    super(), (this.ngModule = n);
  }
  resolveComponentFactory(n) {
    let t = _n(n);
    return new Ur(t, this.ngModule);
  }
};
function _p(e, n) {
  let t = [];
  for (let r in e) {
    if (!e.hasOwnProperty(r)) continue;
    let i = e[r];
    if (i === void 0) continue;
    let o = Array.isArray(i),
      s = o ? i[0] : i,
      a = o ? i[1] : wn.None;
    n
      ? t.push({
          propName: s,
          templateName: r,
          isSignal: (a & wn.SignalBased) !== 0,
        })
      : t.push({ propName: s, templateName: r });
  }
  return t;
}
function ub(e) {
  let n = e.toLowerCase();
  return n === "svg" ? wE : n === "math" ? CE : null;
}
var Ur = class extends Gs {
    componentDef;
    ngModule;
    selector;
    componentType;
    ngContentSelectors;
    isBoundToModule;
    get inputs() {
      let n = this.componentDef,
        t = n.inputTransforms,
        r = _p(n.inputs, !0);
      if (t !== null)
        for (let i of r)
          t.hasOwnProperty(i.propName) && (i.transform = t[i.propName]);
      return r;
    }
    get outputs() {
      return _p(this.componentDef.outputs, !1);
    }
    constructor(n, t) {
      super(),
        (this.componentDef = n),
        (this.ngModule = t),
        (this.componentType = n.type),
        (this.selector = fC(n.selectors)),
        (this.ngContentSelectors = n.ngContentSelectors
          ? n.ngContentSelectors
          : []),
        (this.isBoundToModule = !!t);
    }
    create(n, t, r, i) {
      let o = Y(null);
      try {
        i = i || this.ngModule;
        let s = i instanceof Oe ? i : i?.injector;
        s &&
          this.componentDef.getStandaloneInjector !== null &&
          (s = this.componentDef.getStandaloneInjector(s) || s);
        let a = s ? new Gc(n, s) : n,
          l = a.get(bn, null);
        if (l === null) throw new D(407, !1);
        let c = a.get(cb, null),
          u = a.get(jr, null),
          d = { rendererFactory: l, sanitizer: c, changeDetectionScheduler: u },
          h = l.createRenderer(null, this.componentDef),
          f = this.componentDef.selectors[0][0] || "div",
          m = r
            ? yC(h, r, this.componentDef.encapsulation, a)
            : sm(h, f, ub(f)),
          y = 512;
        this.componentDef.signals
          ? (y |= 4096)
          : this.componentDef.onPush || (y |= 16);
        let E = null;
        m !== null && (E = Wu(m, a, !0));
        let S = ed(0, null, null, 1, 0, null, null, null, null, null, null),
          O = va(null, S, null, y, null, null, d, h, a, null, E);
        xu(O);
        let x,
          U,
          le = null;
        try {
          let X = this.componentDef,
            se,
            we = null;
          X.findHostDirectiveDefs
            ? ((se = []),
              (we = new Map()),
              X.findHostDirectiveDefs(X, se, we),
              se.push(X))
            : (se = [X]);
          let Ht = db(O, m);
          (le = fb(Ht, m, X, se, O, d, h)),
            (U = pg(S, Nt)),
            m && gb(h, X, m, r),
            t !== void 0 && mb(U, this.ngContentSelectors, t),
            (x = pb(le, X, se, we, O, [yb])),
            rd(S, O, null);
        } catch (X) {
          throw (le !== null && Jc(le), Jc(O), X);
        } finally {
          Ru();
        }
        return new cu(this.componentType, x, ga(U, O), O, U);
      } finally {
        Y(o);
      }
    }
  },
  cu = class extends au {
    location;
    _rootLView;
    _tNode;
    instance;
    hostView;
    changeDetectorRef;
    componentType;
    previousInputValues = null;
    constructor(n, t, r, i, o) {
      super(),
        (this.location = r),
        (this._rootLView = i),
        (this._tNode = o),
        (this.instance = t),
        (this.hostView = this.changeDetectorRef = new Yn(i, void 0, !1)),
        (this.componentType = n);
    }
    setInput(n, t) {
      let r = this._tNode.inputs,
        i;
      if (r !== null && (i = r[n])) {
        if (
          ((this.previousInputValues ??= new Map()),
          this.previousInputValues.has(n) &&
            Object.is(this.previousInputValues.get(n), t))
        )
          return;
        let o = this._rootLView;
        nd(o[z], o, i, n, t), this.previousInputValues.set(n, t);
        let s = In(this._tNode.index, o);
        id(s, 1);
      }
    }
    get injector() {
      return new zn(this._tNode, this._rootLView);
    }
    destroy() {
      this.hostView.destroy();
    }
    onDestroy(n) {
      this.hostView.onDestroy(n);
    }
  };
function db(e, n) {
  let t = e[z],
    r = Nt;
  return (e[r] = n), Da(t, r, 2, "#host", null);
}
function fb(e, n, t, r, i, o, s) {
  let a = i[z];
  hb(r, e, n, s);
  let l = null;
  n !== null && (l = Wu(n, i[Fr]));
  let c = o.rendererFactory.createRenderer(n, t),
    u = va(i, bm(t), null, Tm(t), i[e.index], e, o, c, null, null, l);
  return (
    a.firstCreatePass && ru(a, e, r.length - 1), _a(i, u), (i[e.index] = u)
  );
}
function hb(e, n, t, r) {
  for (let i of e) n.mergedAttrs = Ri(n.mergedAttrs, i.hostAttrs);
  n.mergedAttrs !== null &&
    (lu(n, n.mergedAttrs, !0), t !== null && pm(r, t, n));
}
function pb(e, n, t, r, i, o) {
  let s = Le(),
    a = i[z],
    l = at(s, i);
  Sm(a, i, s, t, null, r);
  for (let u = 0; u < t.length; u++) {
    let d = s.directiveStart + u,
      h = Vr(i, a, d, s);
    Kn(h, i);
  }
  Mm(a, i, s), l && Kn(l, i);
  let c = Vr(i, a, s.directiveStart + s.componentOffset, s);
  if (((e[yt] = i[yt] = c), o !== null)) for (let u of o) u(c, n);
  return Em(a, s, i), c;
}
function gb(e, n, t, r) {
  if (r) zc(e, t, ["ng-version", "19.0.0"]);
  else {
    let { attrs: i, classes: o } = hC(n.selectors[0]);
    i && zc(e, t, i), o && o.length > 0 && hm(e, t, o.join(" "));
  }
}
function mb(e, n, t) {
  let r = (e.projection = []);
  for (let i = 0; i < n.length; i++) {
    let o = t[i];
    r.push(o != null && o.length ? Array.from(o) : null);
  }
}
function yb() {
  let e = Le();
  Fu(ne()[z], e);
}
var Ws = class extends Cn {
    ngModuleType;
    _parent;
    _bootstrapComponents = [];
    _r3Injector;
    instance;
    destroyCbs = [];
    componentFactoryResolver = new qs(this);
    constructor(n, t, r, i = !0) {
      super(), (this.ngModuleType = n), (this._parent = t);
      let o = Yp(n);
      (this._bootstrapComponents = om(o.bootstrap)),
        (this._r3Injector = Bg(
          n,
          t,
          [
            { provide: Cn, useValue: this },
            { provide: Br, useValue: this.componentFactoryResolver },
            ...r,
          ],
          Pe(n),
          new Set(["environment"])
        )),
        i && this.resolveInjectorInitializers();
    }
    resolveInjectorInitializers() {
      this._r3Injector.resolveInjectorInitializers(),
        (this.instance = this._r3Injector.get(this.ngModuleType));
    }
    get injector() {
      return this._r3Injector;
    }
    destroy() {
      let n = this._r3Injector;
      !n.destroyed && n.destroy(),
        this.destroyCbs.forEach((t) => t()),
        (this.destroyCbs = null);
    }
    onDestroy(n) {
      this.destroyCbs.push(n);
    }
  },
  Qs = class extends Pi {
    moduleType;
    constructor(n) {
      super(), (this.moduleType = n);
    }
    create(n) {
      return new Ws(this.moduleType, n, []);
    }
  };
function vb(e, n, t) {
  return new Ws(e, n, t, !1);
}
var uu = class extends Cn {
  injector;
  componentFactoryResolver = new qs(this);
  instance = null;
  constructor(n) {
    super();
    let t = new Ni(
      [
        ...n.providers,
        { provide: Cn, useValue: this },
        { provide: Br, useValue: this.componentFactoryResolver },
      ],
      n.parent || Mu(),
      n.debugName,
      new Set(["environment"])
    );
    (this.injector = t),
      n.runEnvironmentInitializers && t.resolveInjectorInitializers();
  }
  destroy() {
    this.injector.destroy();
  }
  onDestroy(n) {
    this.injector.onDestroy(n);
  }
};
function wa(e, n, t = null) {
  return new uu({
    providers: e,
    parent: n,
    debugName: t,
    runEnvironmentInitializers: !0,
  }).injector;
}
var Db = (() => {
  class e {
    _injector;
    cachedInjectors = new Map();
    constructor(t) {
      this._injector = t;
    }
    getOrCreateStandaloneInjector(t) {
      if (!t.standalone) return null;
      if (!this.cachedInjectors.has(t)) {
        let r = tg(!1, t.type),
          i =
            r.length > 0
              ? wa([r], this._injector, `Standalone[${t.type.name}]`)
              : null;
        this.cachedInjectors.set(t, i);
      }
      return this.cachedInjectors.get(t);
    }
    ngOnDestroy() {
      try {
        for (let t of this.cachedInjectors.values()) t !== null && t.destroy();
      } finally {
        this.cachedInjectors.clear();
      }
    }
    static ɵprov = b({
      token: e,
      providedIn: "environment",
      factory: () => new e(M(Oe)),
    });
  }
  return e;
})();
function J(e) {
  return Fi(() => {
    let n = Bm(e),
      t = q(w({}, n), {
        decls: e.decls,
        vars: e.vars,
        template: e.template,
        consts: e.consts || null,
        ngContentSelectors: e.ngContentSelectors,
        onPush: e.changeDetection === Qg.OnPush,
        directiveDefs: null,
        pipeDefs: null,
        dependencies: (n.standalone && e.dependencies) || null,
        getStandaloneInjector: n.standalone
          ? (i) => i.get(Db).getOrCreateStandaloneInjector(t)
          : null,
        getExternalStyles: null,
        signals: e.signals ?? !1,
        data: e.data || {},
        encapsulation: e.encapsulation || Rt.Emulated,
        styles: e.styles || ot,
        _: null,
        schemas: e.schemas || null,
        tView: null,
        id: "",
      });
    n.standalone && er("NgStandalone"), Um(t);
    let r = e.dependencies;
    return (
      (t.directiveDefs = wp(r, !1)), (t.pipeDefs = wp(r, !0)), (t.id = wb(t)), t
    );
  });
}
function _b(e) {
  return _n(e) || Jp(e);
}
function Eb(e) {
  return e !== null;
}
function Se(e) {
  return Fi(() => ({
    type: e.type,
    bootstrap: e.bootstrap || ot,
    declarations: e.declarations || ot,
    imports: e.imports || ot,
    exports: e.exports || ot,
    transitiveCompileScopes: null,
    schemas: e.schemas || null,
    id: e.id || null,
  }));
}
function Ep(e, n) {
  if (e == null) return Rr;
  let t = {};
  for (let r in e)
    if (e.hasOwnProperty(r)) {
      let i = e[r],
        o,
        s,
        a = wn.None;
      Array.isArray(i)
        ? ((a = i[0]), (o = i[1]), (s = i[2] ?? o))
        : ((o = i), (s = i)),
        n ? ((t[o] = a !== wn.None ? [r, a] : r), (n[o] = s)) : (t[o] = r);
    }
  return t;
}
function de(e) {
  return Fi(() => {
    let n = Bm(e);
    return Um(n), n;
  });
}
function jm(e) {
  return {
    type: e.type,
    name: e.name,
    factory: null,
    pure: e.pure !== !1,
    standalone: e.standalone ?? !0,
    onDestroy: e.type.prototype.ngOnDestroy || null,
  };
}
function Bm(e) {
  let n = {};
  return {
    type: e.type,
    providersResolver: null,
    factory: null,
    hostBindings: e.hostBindings || null,
    hostVars: e.hostVars || 0,
    hostAttrs: e.hostAttrs || null,
    contentQueries: e.contentQueries || null,
    declaredInputs: n,
    inputTransforms: null,
    inputConfig: e.inputs || Rr,
    exportAs: e.exportAs || null,
    standalone: e.standalone ?? !0,
    signals: e.signals === !0,
    selectors: e.selectors || ot,
    viewQuery: e.viewQuery || null,
    features: e.features || null,
    setInput: null,
    findHostDirectiveDefs: null,
    hostDirectives: null,
    inputs: Ep(e.inputs, n),
    outputs: Ep(e.outputs),
    debugInfo: null,
  };
}
function Um(e) {
  e.features?.forEach((n) => n(e));
}
function wp(e, n) {
  if (!e) return null;
  let t = n ? Xp : _b;
  return () => (typeof e == "function" ? e() : e).map((r) => t(r)).filter(Eb);
}
function wb(e) {
  let n = 0,
    t = [
      e.selectors,
      e.ngContentSelectors,
      e.hostVars,
      e.hostAttrs,
      e.consts,
      e.vars,
      e.decls,
      e.encapsulation,
      e.standalone,
      e.signals,
      e.exportAs,
      JSON.stringify(e.inputs),
      JSON.stringify(e.outputs),
      Object.getOwnPropertyNames(e.type.prototype),
      !!e.contentQueries,
      !!e.viewQuery,
    ].join("|");
  for (let i of t) n = (Math.imul(31, n) + i.charCodeAt(0)) << 0;
  return (n += 2147483648), "c" + n;
}
var Ca = (() => {
  class e {
    log(t) {
      console.log(t);
    }
    warn(t) {
      console.warn(t);
    }
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "platform" });
  }
  return e;
})();
function Cb(e) {
  return typeof e == "function" && e[We] !== void 0;
}
var od = new I(""),
  Bi = new I(""),
  ba = (() => {
    class e {
      _ngZone;
      registry;
      _isZoneStable = !0;
      _callbacks = [];
      taskTrackingZone = null;
      constructor(t, r, i) {
        (this._ngZone = t),
          (this.registry = r),
          sd || (bb(i), i.addToWindow(r)),
          this._watchAngularEvents(),
          t.run(() => {
            this.taskTrackingZone =
              typeof Zone > "u" ? null : Zone.current.get("TaskTrackingZone");
          });
      }
      _watchAngularEvents() {
        this._ngZone.onUnstable.subscribe({
          next: () => {
            this._isZoneStable = !1;
          },
        }),
          this._ngZone.runOutsideAngular(() => {
            this._ngZone.onStable.subscribe({
              next: () => {
                ee.assertNotInAngularZone(),
                  queueMicrotask(() => {
                    (this._isZoneStable = !0), this._runCallbacksIfReady();
                  });
              },
            });
          });
      }
      isStable() {
        return this._isZoneStable && !this._ngZone.hasPendingMacrotasks;
      }
      _runCallbacksIfReady() {
        if (this.isStable())
          queueMicrotask(() => {
            for (; this._callbacks.length !== 0; ) {
              let t = this._callbacks.pop();
              clearTimeout(t.timeoutId), t.doneCb();
            }
          });
        else {
          let t = this.getPendingTasks();
          this._callbacks = this._callbacks.filter((r) =>
            r.updateCb && r.updateCb(t) ? (clearTimeout(r.timeoutId), !1) : !0
          );
        }
      }
      getPendingTasks() {
        return this.taskTrackingZone
          ? this.taskTrackingZone.macroTasks.map((t) => ({
              source: t.source,
              creationLocation: t.creationLocation,
              data: t.data,
            }))
          : [];
      }
      addCallback(t, r, i) {
        let o = -1;
        r &&
          r > 0 &&
          (o = setTimeout(() => {
            (this._callbacks = this._callbacks.filter(
              (s) => s.timeoutId !== o
            )),
              t();
          }, r)),
          this._callbacks.push({ doneCb: t, timeoutId: o, updateCb: i });
      }
      whenStable(t, r, i) {
        if (i && !this.taskTrackingZone)
          throw new Error(
            'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
          );
        this.addCallback(t, r, i), this._runCallbacksIfReady();
      }
      registerApplication(t) {
        this.registry.registerApplication(t, this);
      }
      unregisterApplication(t) {
        this.registry.unregisterApplication(t);
      }
      findProviders(t, r, i) {
        return [];
      }
      static ɵfac = function (r) {
        return new (r || e)(M(ee), M(Ia), M(Bi));
      };
      static ɵprov = b({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  Ia = (() => {
    class e {
      _applications = new Map();
      registerApplication(t, r) {
        this._applications.set(t, r);
      }
      unregisterApplication(t) {
        this._applications.delete(t);
      }
      unregisterAllApplications() {
        this._applications.clear();
      }
      getTestability(t) {
        return this._applications.get(t) || null;
      }
      getAllTestabilities() {
        return Array.from(this._applications.values());
      }
      getAllRootElements() {
        return Array.from(this._applications.keys());
      }
      findTestabilityInTree(t, r = !0) {
        return sd?.findTestabilityInTree(this, t, r) ?? null;
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "platform" });
    }
    return e;
  })();
function bb(e) {
  sd = e;
}
var sd;
function nr(e) {
  return !!e && typeof e.then == "function";
}
function $m(e) {
  return !!e && typeof e.subscribe == "function";
}
var Sa = new I("");
var Hm = (() => {
    class e {
      resolve;
      reject;
      initialized = !1;
      done = !1;
      donePromise = new Promise((t, r) => {
        (this.resolve = t), (this.reject = r);
      });
      appInits = v(Sa, { optional: !0 }) ?? [];
      injector = v(Ye);
      constructor() {}
      runInitializers() {
        if (this.initialized) return;
        let t = [];
        for (let i of this.appInits) {
          let o = $e(this.injector, i);
          if (nr(o)) t.push(o);
          else if ($m(o)) {
            let s = new Promise((a, l) => {
              o.subscribe({ complete: a, error: l });
            });
            t.push(s);
          }
        }
        let r = () => {
          (this.done = !0), this.resolve();
        };
        Promise.all(t)
          .then(() => {
            r();
          })
          .catch((i) => {
            this.reject(i);
          }),
          t.length === 0 && r(),
          (this.initialized = !0);
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })(),
  Ib = (() => {
    class e {
      static ɵprov = b({
        token: e,
        providedIn: "root",
        factory: () => new du(),
      });
    }
    return e;
  })(),
  du = class {
    queuedEffectCount = 0;
    queues = new Map();
    schedule(n) {
      this.enqueue(n);
    }
    enqueue(n) {
      let t = n.zone;
      this.queues.has(t) || this.queues.set(t, new Set());
      let r = this.queues.get(t);
      r.has(n) || (this.queuedEffectCount++, r.add(n));
    }
    flush() {
      for (; this.queuedEffectCount > 0; )
        for (let [n, t] of this.queues)
          n === null ? this.flushQueue(t) : n.run(() => this.flushQueue(t));
    }
    flushQueue(n) {
      for (let t of n) n.delete(t), this.queuedEffectCount--, t.run();
    }
  },
  Ma = new I("");
function Sb() {
  _h(() => {
    throw new D(600, !1);
  });
}
function Mb(e) {
  return e.isBoundToModule;
}
var Tb = 10;
function Ab(e, n, t) {
  try {
    let r = t();
    return nr(r)
      ? r.catch((i) => {
          throw (n.runOutsideAngular(() => e.handleError(i)), i);
        })
      : r;
  } catch (r) {
    throw (n.runOutsideAngular(() => e.handleError(r)), r);
  }
}
function zm(e, n) {
  return Array.isArray(n) ? n.reduce(zm, e) : w(w({}, e), n);
}
var en = (() => {
  class e {
    _bootstrapListeners = [];
    _runningTick = !1;
    _destroyed = !1;
    _destroyListeners = [];
    _views = [];
    internalErrorHandler = v(mw);
    afterRenderManager = v(tm);
    zonelessEnabled = v(ju);
    rootEffectScheduler = v(Ib);
    dirtyFlags = 0;
    deferredDirtyFlags = 0;
    externalTestViews = new Set();
    afterTick = new Ee();
    get allViews() {
      return [...this.externalTestViews.keys(), ...this._views];
    }
    get destroyed() {
      return this._destroyed;
    }
    componentTypes = [];
    components = [];
    isStable = v(Jt).hasPendingTasks.pipe(L((t) => !t));
    whenStable() {
      let t;
      return new Promise((r) => {
        t = this.isStable.subscribe({
          next: (i) => {
            i && r();
          },
        });
      }).finally(() => {
        t.unsubscribe();
      });
    }
    _injector = v(Oe);
    get injector() {
      return this._injector;
    }
    bootstrap(t, r) {
      let i = t instanceof Gs;
      if (!this._injector.get(Hm).done) {
        let h = !i && eg(t),
          f = !1;
        throw new D(405, f);
      }
      let s;
      i ? (s = t) : (s = this._injector.get(Br).resolveComponentFactory(t)),
        this.componentTypes.push(s.componentType);
      let a = Mb(s) ? void 0 : this._injector.get(Cn),
        l = r || s.selector,
        c = s.create(Ye.NULL, [], l, a),
        u = c.location.nativeElement,
        d = c.injector.get(od, null);
      return (
        d?.registerApplication(u),
        c.onDestroy(() => {
          this.detachView(c.hostView),
            Cs(this.components, c),
            d?.unregisterApplication(u);
        }),
        this._loadComponent(c),
        c
      );
    }
    tick() {
      this.zonelessEnabled || (this.dirtyFlags |= 1), this._tick();
    }
    _tick() {
      if (this._runningTick) throw new D(101, !1);
      let t = Y(null);
      try {
        (this._runningTick = !0), this.synchronize();
      } catch (r) {
        this.internalErrorHandler(r);
      } finally {
        (this._runningTick = !1), Y(t), this.afterTick.next();
      }
    }
    synchronize() {
      let t = null;
      this._injector.destroyed ||
        (t = this._injector.get(bn, null, { optional: !0 })),
        (this.dirtyFlags |= this.deferredDirtyFlags),
        (this.deferredDirtyFlags = 0);
      let r = 0;
      for (; this.dirtyFlags !== 0 && r++ < Tb; ) this.synchronizeOnce(t);
    }
    synchronizeOnce(t) {
      if (
        ((this.dirtyFlags |= this.deferredDirtyFlags),
        (this.deferredDirtyFlags = 0),
        this.dirtyFlags & 16 &&
          ((this.dirtyFlags &= -17), this.rootEffectScheduler.flush()),
        this.dirtyFlags & 7)
      ) {
        let r = !!(this.dirtyFlags & 1);
        (this.dirtyFlags &= -8), (this.dirtyFlags |= 8);
        for (let { _lView: i, notifyErrorHandler: o } of this.allViews)
          Nb(i, o, r, this.zonelessEnabled);
        if (
          ((this.dirtyFlags &= -5),
          this.syncDirtyFlagsWithViews(),
          this.dirtyFlags & 23)
        )
          return;
      } else t?.begin?.(), t?.end?.();
      this.dirtyFlags & 8 &&
        ((this.dirtyFlags &= -9), this.afterRenderManager.execute()),
        this.syncDirtyFlagsWithViews();
    }
    syncDirtyFlagsWithViews() {
      if (this.allViews.some(({ _lView: t }) => ca(t))) {
        this.dirtyFlags |= 2;
        return;
      } else this.dirtyFlags &= -8;
    }
    attachView(t) {
      let r = t;
      this._views.push(r), r.attachToAppRef(this);
    }
    detachView(t) {
      let r = t;
      Cs(this._views, r), r.detachFromAppRef();
    }
    _loadComponent(t) {
      this.attachView(t.hostView), this.tick(), this.components.push(t);
      let r = this._injector.get(Ma, []);
      [...this._bootstrapListeners, ...r].forEach((i) => i(t));
    }
    ngOnDestroy() {
      if (!this._destroyed)
        try {
          this._destroyListeners.forEach((t) => t()),
            this._views.slice().forEach((t) => t.destroy());
        } finally {
          (this._destroyed = !0),
            (this._views = []),
            (this._bootstrapListeners = []),
            (this._destroyListeners = []);
        }
    }
    onDestroy(t) {
      return (
        this._destroyListeners.push(t), () => Cs(this._destroyListeners, t)
      );
    }
    destroy() {
      if (this._destroyed) throw new D(406, !1);
      let t = this._injector;
      t.destroy && !t.destroyed && t.destroy();
    }
    get viewCount() {
      return this._views.length;
    }
    warnIfDestroyed() {}
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" });
  }
  return e;
})();
function Cs(e, n) {
  let t = e.indexOf(n);
  t > -1 && e.splice(t, 1);
}
function Nb(e, n, t, r) {
  if (!t && !ca(e)) return;
  Fm(e, n, t && !r ? 0 : 1);
}
var $F = new RegExp(`^(\\d+)*(${Iw}|${bw})*(.*)`);
var xb = () => null;
function Cp(e, n) {
  return xb(e, n);
}
var Gr = (() => {
  class e {
    static __NG_ELEMENT_ID__ = Rb;
  }
  return e;
})();
function Rb() {
  let e = Le();
  return Ob(e, ne());
}
var Pb = Gr,
  Gm = class extends Pb {
    _lContainer;
    _hostTNode;
    _hostLView;
    constructor(n, t, r) {
      super(),
        (this._lContainer = n),
        (this._hostTNode = t),
        (this._hostLView = r);
    }
    get element() {
      return ga(this._hostTNode, this._hostLView);
    }
    get injector() {
      return new zn(this._hostTNode, this._hostLView);
    }
    get parentInjector() {
      let n = ku(this._hostTNode, this._hostLView);
      if (xg(n)) {
        let t = ks(n, this._hostLView),
          r = Fs(n),
          i = t[z].data[r + 8];
        return new zn(i, t);
      } else return new zn(null, this._hostLView);
    }
    clear() {
      for (; this.length > 0; ) this.remove(this.length - 1);
    }
    get(n) {
      let t = bp(this._lContainer);
      return (t !== null && t[n]) || null;
    }
    get length() {
      return this._lContainer.length - st;
    }
    createEmbeddedView(n, t, r) {
      let i, o;
      typeof r == "number"
        ? (i = r)
        : r != null && ((i = r.index), (o = r.injector));
      let s = Cp(this._lContainer, n.ssrId),
        a = n.createEmbeddedViewImpl(t || {}, o, s);
      return this.insertImpl(a, i, Dp(this._hostTNode, s)), a;
    }
    createComponent(n, t, r, i, o) {
      let s = n && !vE(n),
        a;
      if (s) a = t;
      else {
        let m = t || {};
        (a = m.index),
          (r = m.injector),
          (i = m.projectableNodes),
          (o = m.environmentInjector || m.ngModuleRef);
      }
      let l = s ? n : new Ur(_n(n)),
        c = r || this.parentInjector;
      if (!o && l.ngModule == null) {
        let y = (s ? c : this.parentInjector).get(Oe, null);
        y && (o = y);
      }
      let u = _n(l.componentType ?? {}),
        d = Cp(this._lContainer, u?.id ?? null),
        h = d?.firstChild ?? null,
        f = l.create(c, i, h, o);
      return this.insertImpl(f.hostView, a, Dp(this._hostTNode, d)), f;
    }
    insert(n, t) {
      return this.insertImpl(n, t, !0);
    }
    insertImpl(n, t, r) {
      let i = n._lView;
      if (IE(i)) {
        let a = this.indexOf(n);
        if (a !== -1) this.detach(a);
        else {
          let l = i[Fe],
            c = new Gm(l, l[vt], l[Fe]);
          c.detach(c.indexOf(n));
        }
      }
      let o = this._adjustIndex(t),
        s = this._lContainer;
      return GC(s, i, o, r), n.attachToViewContainerRef(), Qp(Mc(s), o, n), n;
    }
    move(n, t) {
      return this.insert(n, t);
    }
    indexOf(n) {
      let t = bp(this._lContainer);
      return t !== null ? t.indexOf(n) : -1;
    }
    remove(n) {
      let t = this._adjustIndex(n, -1),
        r = tu(this._lContainer, t);
      r && (Ss(Mc(this._lContainer), t), cm(r[z], r));
    }
    detach(n) {
      let t = this._adjustIndex(n, -1),
        r = tu(this._lContainer, t);
      return r && Ss(Mc(this._lContainer), t) != null ? new Yn(r) : null;
    }
    _adjustIndex(n, t = 0) {
      return n ?? this.length + t;
    }
  };
function bp(e) {
  return e[xs];
}
function Mc(e) {
  return e[xs] || (e[xs] = []);
}
function Ob(e, n) {
  let t,
    r = n[e.index];
  return (
    Kt(r) ? (t = r) : ((t = Am(r, n, null, e)), (n[e.index] = t), _a(n, t)),
    kb(t, n, e, r),
    new Gm(t, e, n)
  );
}
function Fb(e, n) {
  let t = e[De],
    r = t.createComment(""),
    i = at(n, e),
    o = dm(t, i);
  return Hs(t, o, r, Qw(t, i), !1), r;
}
var kb = jb,
  Lb = () => !1;
function Vb(e, n, t) {
  return Lb(e, n, t);
}
function jb(e, n, t, r) {
  if (e[qn]) return;
  let i;
  t.type & 8 ? (i = xt(r)) : (i = Fb(n, t)), (e[qn] = i);
}
function Ui(e, n) {
  er("NgSignals");
  let t = Eh(e),
    r = t[We];
  return (
    n?.equal && (r.equal = n.equal),
    (t.set = (i) => zo(r, i)),
    (t.update = (i) => wh(r, i)),
    (t.asReadonly = Bb.bind(t)),
    t
  );
}
function Bb() {
  let e = this[We];
  if (e.readonlyFn === void 0) {
    let n = () => this();
    (n[We] = e), (e.readonlyFn = n);
  }
  return e.readonlyFn;
}
function qm(e) {
  return Cb(e) && typeof e.set == "function";
}
function Ub(e) {
  let n = [],
    t = new Map();
  function r(i) {
    let o = t.get(i);
    if (!o) {
      let s = e(i);
      t.set(i, (o = s.then(Gb)));
    }
    return o;
  }
  return (
    Zs.forEach((i, o) => {
      let s = [];
      i.templateUrl &&
        s.push(
          r(i.templateUrl).then((c) => {
            i.template = c;
          })
        );
      let a = typeof i.styles == "string" ? [i.styles] : i.styles || [];
      if (((i.styles = a), i.styleUrl && i.styleUrls?.length))
        throw new Error(
          "@Component cannot define both `styleUrl` and `styleUrls`. Use `styleUrl` if the component has one stylesheet, or `styleUrls` if it has multiple"
        );
      if (i.styleUrls?.length) {
        let c = i.styles.length,
          u = i.styleUrls;
        i.styleUrls.forEach((d, h) => {
          a.push(""),
            s.push(
              r(d).then((f) => {
                (a[c + h] = f),
                  u.splice(u.indexOf(d), 1),
                  u.length == 0 && (i.styleUrls = void 0);
              })
            );
        });
      } else
        i.styleUrl &&
          s.push(
            r(i.styleUrl).then((c) => {
              a.push(c), (i.styleUrl = void 0);
            })
          );
      let l = Promise.all(s).then(() => qb(o));
      n.push(l);
    }),
    Hb(),
    Promise.all(n).then(() => {})
  );
}
var Zs = new Map(),
  $b = new Set();
function Hb() {
  let e = Zs;
  return (Zs = new Map()), e;
}
function zb() {
  return Zs.size === 0;
}
function Gb(e) {
  return typeof e == "string" ? e : e.text();
}
function qb(e) {
  $b.delete(e);
}
function Wb(e) {
  return Object.getPrototypeOf(e.prototype).constructor;
}
function lt(e) {
  let n = Wb(e.type),
    t = !0,
    r = [e];
  for (; n; ) {
    let i;
    if (En(e)) i = n.ɵcmp || n.ɵdir;
    else {
      if (n.ɵcmp) throw new D(903, !1);
      i = n.ɵdir;
    }
    if (i) {
      if (t) {
        r.push(i);
        let s = e;
        (s.inputs = ms(e.inputs)),
          (s.inputTransforms = ms(e.inputTransforms)),
          (s.declaredInputs = ms(e.declaredInputs)),
          (s.outputs = ms(e.outputs));
        let a = i.hostBindings;
        a && Jb(e, a);
        let l = i.viewQuery,
          c = i.contentQueries;
        if (
          (l && Kb(e, l),
          c && Yb(e, c),
          Qb(e, i),
          L_(e.outputs, i.outputs),
          En(i) && i.data.animation)
        ) {
          let u = e.data;
          u.animation = (u.animation || []).concat(i.data.animation);
        }
      }
      let o = i.features;
      if (o)
        for (let s = 0; s < o.length; s++) {
          let a = o[s];
          a && a.ngInherit && a(e), a === lt && (t = !1);
        }
    }
    n = Object.getPrototypeOf(n);
  }
  Zb(r);
}
function Qb(e, n) {
  for (let t in n.inputs) {
    if (!n.inputs.hasOwnProperty(t) || e.inputs.hasOwnProperty(t)) continue;
    let r = n.inputs[t];
    if (
      r !== void 0 &&
      ((e.inputs[t] = r),
      (e.declaredInputs[t] = n.declaredInputs[t]),
      n.inputTransforms !== null)
    ) {
      let i = Array.isArray(r) ? r[0] : r;
      if (!n.inputTransforms.hasOwnProperty(i)) continue;
      (e.inputTransforms ??= {}), (e.inputTransforms[i] = n.inputTransforms[i]);
    }
  }
}
function Zb(e) {
  let n = 0,
    t = null;
  for (let r = e.length - 1; r >= 0; r--) {
    let i = e[r];
    (i.hostVars = n += i.hostVars),
      (i.hostAttrs = Ri(i.hostAttrs, (t = Ri(t, i.hostAttrs))));
  }
}
function ms(e) {
  return e === Rr ? {} : e === ot ? [] : e;
}
function Kb(e, n) {
  let t = e.viewQuery;
  t
    ? (e.viewQuery = (r, i) => {
        n(r, i), t(r, i);
      })
    : (e.viewQuery = n);
}
function Yb(e, n) {
  let t = e.contentQueries;
  t
    ? (e.contentQueries = (r, i, o) => {
        n(r, i, o), t(r, i, o);
      })
    : (e.contentQueries = n);
}
function Jb(e, n) {
  let t = e.hostBindings;
  t
    ? (e.hostBindings = (r, i) => {
        n(r, i), t(r, i);
      })
    : (e.hostBindings = n);
}
function ad(e) {
  let n = e.inputConfig,
    t = {};
  for (let r in n)
    if (n.hasOwnProperty(r)) {
      let i = n[r];
      Array.isArray(i) && i[3] && (t[r] = i[3]);
    }
  e.inputTransforms = t;
}
function Wm(e) {
  return ld(e)
    ? Array.isArray(e) || (!(e instanceof Map) && Symbol.iterator in e)
    : !1;
}
function Xb(e, n) {
  if (Array.isArray(e)) for (let t = 0; t < e.length; t++) n(e[t]);
  else {
    let t = e[Symbol.iterator](),
      r;
    for (; !(r = t.next()).done; ) n(r.value);
  }
}
function ld(e) {
  return e !== null && (typeof e == "function" || typeof e == "object");
}
function e0(e, n, t) {
  return (e[n] = t);
}
function qr(e, n, t) {
  let r = e[n];
  return Object.is(r, t) ? !1 : ((e[n] = t), !0);
}
function t0(e) {
  return (e.flags & 32) === 32;
}
function n0(e, n, t, r, i, o, s, a, l) {
  let c = n.consts,
    u = Da(n, e, 4, s || null, a || null);
  Im(n, t, u, Os(c, l)), Fu(n, u);
  let d = (u.tView = ed(
    2,
    u,
    r,
    i,
    o,
    n.directiveRegistry,
    n.pipeRegistry,
    null,
    n.schemas,
    c,
    null
  ));
  return (
    n.queries !== null &&
      (n.queries.template(n, u), (d.queries = n.queries.embeddedTView(u))),
    u
  );
}
function r0(e, n, t, r, i, o, s, a, l, c) {
  let u = t + Nt,
    d = n.firstCreatePass ? n0(u, n, e, r, i, o, s, a, l) : n.data[u];
  Vi(d, !1);
  let h = i0(n, e, d, t);
  Pu() && Yu(n, e, h, d), Kn(h, e);
  let f = Am(h, e, h, d);
  return (
    (e[u] = f),
    _a(e, f),
    Vb(f, d, e),
    Tu(d) && wm(n, e, d),
    l != null && Cm(e, d, c),
    d
  );
}
function He(e, n, t, r, i, o, s, a) {
  let l = ne(),
    c = ke(),
    u = Os(c.consts, o);
  return r0(l, c, e, n, t, r, i, u, s, a), He;
}
var i0 = o0;
function o0(e, n, t, r) {
  return Ou(!0), n[De].createComment("");
}
function $i(e, n, t, r) {
  let i = ne(),
    o = ha();
  if (qr(i, o, n)) {
    let s = ke(),
      a = pa();
    OC(a, i, e, n, t, r);
  }
  return $i;
}
function Qm(e, n, t, r) {
  return qr(e, ha(), t) ? n + na(t) + r : Sn;
}
function ys(e, n) {
  return (e << 17) | (n << 2);
}
function Jn(e) {
  return (e >> 17) & 32767;
}
function s0(e) {
  return (e & 2) == 2;
}
function a0(e, n) {
  return (e & 131071) | (n << 17);
}
function fu(e) {
  return e | 2;
}
function $r(e) {
  return (e & 131068) >> 2;
}
function Tc(e, n) {
  return (e & -131069) | (n << 2);
}
function l0(e) {
  return (e & 1) === 1;
}
function hu(e) {
  return e | 1;
}
function c0(e, n, t, r, i, o) {
  let s = o ? n.classBindings : n.styleBindings,
    a = Jn(s),
    l = $r(s);
  e[r] = t;
  let c = !1,
    u;
  if (Array.isArray(t)) {
    let d = t;
    (u = d[1]), (u === null || Li(d, u) > 0) && (c = !0);
  } else u = t;
  if (i)
    if (l !== 0) {
      let h = Jn(e[a + 1]);
      (e[r + 1] = ys(h, a)),
        h !== 0 && (e[h + 1] = Tc(e[h + 1], r)),
        (e[a + 1] = a0(e[a + 1], r));
    } else
      (e[r + 1] = ys(a, 0)), a !== 0 && (e[a + 1] = Tc(e[a + 1], r)), (a = r);
  else
    (e[r + 1] = ys(l, 0)),
      a === 0 ? (a = r) : (e[l + 1] = Tc(e[l + 1], r)),
      (l = r);
  c && (e[r + 1] = fu(e[r + 1])),
    Ip(e, u, r, !0),
    Ip(e, u, r, !1),
    u0(n, u, e, r, o),
    (s = ys(a, l)),
    o ? (n.classBindings = s) : (n.styleBindings = s);
}
function u0(e, n, t, r, i) {
  let o = i ? e.residualClasses : e.residualStyles;
  o != null &&
    typeof n == "string" &&
    Li(o, n) >= 0 &&
    (t[r + 1] = hu(t[r + 1]));
}
function Ip(e, n, t, r) {
  let i = e[t + 1],
    o = n === null,
    s = r ? Jn(i) : $r(i),
    a = !1;
  for (; s !== 0 && (a === !1 || o); ) {
    let l = e[s],
      c = e[s + 1];
    d0(l, n) && ((a = !0), (e[s + 1] = r ? hu(c) : fu(c))),
      (s = r ? Jn(c) : $r(c));
  }
  a && (e[t + 1] = r ? fu(i) : hu(i));
}
function d0(e, n) {
  return e === null || n == null || (Array.isArray(e) ? e[1] : e) === n
    ? !0
    : Array.isArray(e) && typeof n == "string"
    ? Li(e, n) >= 0
    : !1;
}
function re(e, n, t) {
  let r = ne(),
    i = ha();
  if (qr(r, i, n)) {
    let o = ke(),
      s = pa();
    td(o, s, r, e, n, r[De], t, !1);
  }
  return re;
}
function Sp(e, n, t, r, i) {
  let o = n.inputs,
    s = i ? "class" : "style";
  nd(e, t, o[s], s, r);
}
function Ta(e, n) {
  return f0(e, n, null, !0), Ta;
}
function f0(e, n, t, r) {
  let i = ne(),
    o = ke(),
    s = LE(2);
  if ((o.firstUpdatePass && p0(o, e, s, r), n !== Sn && qr(i, s, n))) {
    let a = o.data[zr()];
    D0(o, a, i, i[De], e, (i[s + 1] = _0(n, t)), r, s);
  }
}
function h0(e, n) {
  return n >= e.expandoStartIndex;
}
function p0(e, n, t, r) {
  let i = e.data;
  if (i[t + 1] === null) {
    let o = i[zr()],
      s = h0(e, t);
    E0(o, r) && n === null && !s && (n = !1),
      (n = g0(i, o, n, r)),
      c0(i, o, n, t, s, r);
  }
}
function g0(e, n, t, r) {
  let i = UE(e),
    o = r ? n.residualClasses : n.residualStyles;
  if (i === null)
    (r ? n.classBindings : n.styleBindings) === 0 &&
      ((t = Ac(null, e, n, t, r)), (t = Oi(t, n.attrs, r)), (o = null));
  else {
    let s = n.directiveStylingLast;
    if (s === -1 || e[s] !== i)
      if (((t = Ac(i, e, n, t, r)), o === null)) {
        let l = m0(e, n, r);
        l !== void 0 &&
          Array.isArray(l) &&
          ((l = Ac(null, e, n, l[1], r)),
          (l = Oi(l, n.attrs, r)),
          y0(e, n, r, l));
      } else o = v0(e, n, r);
  }
  return (
    o !== void 0 && (r ? (n.residualClasses = o) : (n.residualStyles = o)), t
  );
}
function m0(e, n, t) {
  let r = t ? n.classBindings : n.styleBindings;
  if ($r(r) !== 0) return e[Jn(r)];
}
function y0(e, n, t, r) {
  let i = t ? n.classBindings : n.styleBindings;
  e[Jn(i)] = r;
}
function v0(e, n, t) {
  let r,
    i = n.directiveEnd;
  for (let o = 1 + n.directiveStylingLast; o < i; o++) {
    let s = e[o].hostAttrs;
    r = Oi(r, s, t);
  }
  return Oi(r, n.attrs, t);
}
function Ac(e, n, t, r, i) {
  let o = null,
    s = t.directiveEnd,
    a = t.directiveStylingLast;
  for (
    a === -1 ? (a = t.directiveStart) : a++;
    a < s && ((o = n[a]), (r = Oi(r, o.hostAttrs, i)), o !== e);

  )
    a++;
  return e !== null && (t.directiveStylingLast = a), r;
}
function Oi(e, n, t) {
  let r = t ? 1 : 2,
    i = -1;
  if (n !== null)
    for (let o = 0; o < n.length; o++) {
      let s = n[o];
      typeof s == "number"
        ? (i = s)
        : i === r &&
          (Array.isArray(e) || (e = e === void 0 ? [] : ["", e]),
          rE(e, s, t ? !0 : n[++o]));
    }
  return e === void 0 ? null : e;
}
function D0(e, n, t, r, i, o, s, a) {
  if (!(n.type & 3)) return;
  let l = e.data,
    c = l[a + 1],
    u = l0(c) ? Mp(l, n, t, i, $r(c), s) : void 0;
  if (!Ks(u)) {
    Ks(o) || (s0(c) && (o = Mp(l, null, t, i, a, s)));
    let d = hg(zr(), t);
    tC(r, s, d, i, o);
  }
}
function Mp(e, n, t, r, i, o) {
  let s = n === null,
    a;
  for (; i > 0; ) {
    let l = e[i],
      c = Array.isArray(l),
      u = c ? l[1] : l,
      d = u === null,
      h = t[i + 1];
    h === Sn && (h = d ? ot : void 0);
    let f = d ? _c(h, r) : u === r ? h : void 0;
    if ((c && !Ks(f) && (f = _c(l, r)), Ks(f) && ((a = f), s))) return a;
    let m = e[i + 1];
    i = s ? Jn(m) : $r(m);
  }
  if (n !== null) {
    let l = o ? n.residualClasses : n.residualStyles;
    l != null && (a = _c(l, r));
  }
  return a;
}
function Ks(e) {
  return e !== void 0;
}
function _0(e, n) {
  return (
    e == null ||
      e === "" ||
      (typeof n == "string"
        ? (e = e + n)
        : typeof e == "object" && (e = Pe(ji(e)))),
    e
  );
}
function E0(e, n) {
  return (e.flags & (n ? 8 : 16)) !== 0;
}
function w0(e, n, t, r, i, o) {
  let s = n.consts,
    a = Os(s, i),
    l = Da(n, e, 2, r, a);
  return (
    Im(n, t, l, Os(s, o)),
    l.attrs !== null && lu(l, l.attrs, !1),
    l.mergedAttrs !== null && lu(l, l.mergedAttrs, !0),
    n.queries !== null && n.queries.elementStart(n, l),
    l
  );
}
function p(e, n, t, r) {
  let i = ne(),
    o = ke(),
    s = Nt + e,
    a = i[De],
    l = o.firstCreatePass ? w0(s, o, i, n, t, r) : o.data[s],
    c = C0(o, i, l, a, n, e);
  i[s] = c;
  let u = Tu(l);
  return (
    Vi(l, !0),
    pm(a, c, l),
    !t0(l) && Pu() && Yu(o, i, c, l),
    TE() === 0 && Kn(c, i),
    AE(),
    u && (wm(o, i, l), Em(o, l, i)),
    r !== null && Cm(i, l),
    p
  );
}
function g() {
  let e = Le();
  Dg() ? FE() : ((e = e.parent), Vi(e, !1));
  let n = e;
  RE(n) && PE(), NE();
  let t = ke();
  return (
    t.firstCreatePass && (Fu(t, e), lg(e) && t.queries.elementEnd(e)),
    n.classesWithoutHost != null &&
      QE(n) &&
      Sp(t, n, ne(), n.classesWithoutHost, !0),
    n.stylesWithoutHost != null &&
      ZE(n) &&
      Sp(t, n, ne(), n.stylesWithoutHost, !1),
    g
  );
}
function V(e, n, t, r) {
  return p(e, n, t, r), g(), V;
}
var C0 = (e, n, t, r, i, o) => (Ou(!0), sm(r, i, zE()));
function Aa() {
  return ne();
}
var Hn = void 0;
function b0(e) {
  let n = e,
    t = Math.floor(Math.abs(e)),
    r = e.toString().replace(/^[^.]*\.?/, "").length;
  return t === 1 && r === 0 ? 1 : 5;
}
var I0 = [
    "en",
    [["a", "p"], ["AM", "PM"], Hn],
    [["AM", "PM"], Hn, Hn],
    [
      ["S", "M", "T", "W", "T", "F", "S"],
      ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    ],
    Hn,
    [
      ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
      [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    ],
    Hn,
    [
      ["B", "A"],
      ["BC", "AD"],
      ["Before Christ", "Anno Domini"],
    ],
    0,
    [6, 0],
    ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
    ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
    ["{1}, {0}", Hn, "{1} 'at' {0}", Hn],
    [".", ",", ";", "%", "+", "-", "E", "\xD7", "\u2030", "\u221E", "NaN", ":"],
    ["#,##0.###", "#,##0%", "\xA4#,##0.00", "#E0"],
    "USD",
    "$",
    "US Dollar",
    {},
    "ltr",
    b0,
  ],
  Nc = {};
function Na(e) {
  let n = S0(e),
    t = Tp(n);
  if (t) return t;
  let r = n.split("-")[0];
  if (((t = Tp(r)), t)) return t;
  if (r === "en") return I0;
  throw new D(701, !1);
}
function Tp(e) {
  return (
    e in Nc ||
      (Nc[e] =
        xe.ng &&
        xe.ng.common &&
        xe.ng.common.locales &&
        xe.ng.common.locales[e]),
    Nc[e]
  );
}
var rr = (function (e) {
  return (
    (e[(e.LocaleId = 0)] = "LocaleId"),
    (e[(e.DayPeriodsFormat = 1)] = "DayPeriodsFormat"),
    (e[(e.DayPeriodsStandalone = 2)] = "DayPeriodsStandalone"),
    (e[(e.DaysFormat = 3)] = "DaysFormat"),
    (e[(e.DaysStandalone = 4)] = "DaysStandalone"),
    (e[(e.MonthsFormat = 5)] = "MonthsFormat"),
    (e[(e.MonthsStandalone = 6)] = "MonthsStandalone"),
    (e[(e.Eras = 7)] = "Eras"),
    (e[(e.FirstDayOfWeek = 8)] = "FirstDayOfWeek"),
    (e[(e.WeekendRange = 9)] = "WeekendRange"),
    (e[(e.DateFormat = 10)] = "DateFormat"),
    (e[(e.TimeFormat = 11)] = "TimeFormat"),
    (e[(e.DateTimeFormat = 12)] = "DateTimeFormat"),
    (e[(e.NumberSymbols = 13)] = "NumberSymbols"),
    (e[(e.NumberFormats = 14)] = "NumberFormats"),
    (e[(e.CurrencyCode = 15)] = "CurrencyCode"),
    (e[(e.CurrencySymbol = 16)] = "CurrencySymbol"),
    (e[(e.CurrencyName = 17)] = "CurrencyName"),
    (e[(e.Currencies = 18)] = "Currencies"),
    (e[(e.Directionality = 19)] = "Directionality"),
    (e[(e.PluralCase = 20)] = "PluralCase"),
    (e[(e.ExtraData = 21)] = "ExtraData"),
    e
  );
})(rr || {});
function S0(e) {
  return e.toLowerCase().replace(/_/g, "-");
}
var Ys = "en-US",
  M0 = "USD";
var T0 = Ys;
function A0(e) {
  typeof e == "string" && (T0 = e.toLowerCase().replace(/_/g, "-"));
}
var N0 = (e, n, t) => {};
function j(e, n, t, r) {
  let i = ne(),
    o = ke(),
    s = Le();
  return Zm(o, i, i[De], s, e, n, r), j;
}
function x0(e, n, t, r) {
  let i = e.cleanup;
  if (i != null)
    for (let o = 0; o < i.length - 1; o += 2) {
      let s = i[o];
      if (s === t && i[o + 1] === r) {
        let a = n[As],
          l = i[o + 2];
        return a.length > l ? a[l] : null;
      }
      typeof s == "string" && (o += 2);
    }
  return null;
}
function Zm(e, n, t, r, i, o, s) {
  let a = Tu(r),
    c = e.firstCreatePass && jC(e),
    u = n[yt],
    d = VC(n),
    h = !0;
  if (r.type & 3 || s) {
    let y = at(r, n),
      E = s ? s(y) : y,
      S = d.length,
      O = s ? (U) => s(xt(U[r.index])) : r.index,
      x = null;
    if ((!s && a && (x = x0(e, n, i, r.index)), x !== null)) {
      let U = x.__ngLastListenerFn__ || x;
      (U.__ngNextListenerFn__ = o), (x.__ngLastListenerFn__ = o), (h = !1);
    } else {
      (o = Np(r, n, u, o)), N0(y, i, o);
      let U = t.listen(E, i, o);
      d.push(o, U), c && c.push(i, O, S, S + 1);
    }
  } else o = Np(r, n, u, o);
  let f = r.outputs,
    m;
  if (h && f !== null && (m = f[i])) {
    let y = m.length;
    if (y)
      for (let E = 0; E < y; E += 2) {
        let S = m[E],
          O = m[E + 1],
          le = n[S][O].subscribe(o),
          X = d.length;
        d.push(o, le), c && c.push(i, r.index, X, -(X + 1));
      }
  }
}
function Ap(e, n, t, r) {
  let i = Y(null);
  try {
    return Mt(6, n, t), t(r) !== !1;
  } catch (o) {
    return xm(e, o), !1;
  } finally {
    Mt(7, n, t), Y(i);
  }
}
function Np(e, n, t, r) {
  return function i(o) {
    if (o === Function) return r;
    let s = e.componentOffset > -1 ? In(e.index, n) : n;
    id(s, 5);
    let a = Ap(n, t, r, o),
      l = i.__ngNextListenerFn__;
    for (; l; ) (a = Ap(n, t, l, o) && a), (l = l.__ngNextListenerFn__);
    return a;
  };
}
function Wr(e = 1) {
  return HE(e);
}
function Qr(e, n, t) {
  return Zr(e, "", n, "", t), Qr;
}
function Zr(e, n, t, r, i) {
  let o = ne(),
    s = Qm(o, n, t, r);
  if (s !== Sn) {
    let a = ke(),
      l = pa();
    td(a, l, o, e, s, o[De], i, !1);
  }
  return Zr;
}
function R0(e, n, t, r) {
  t >= e.data.length && ((e.data[t] = null), (e.blueprint[t] = null)),
    (n[t] = r);
}
function _(e, n = "") {
  let t = ne(),
    r = ke(),
    i = e + Nt,
    o = r.firstCreatePass ? Da(r, i, 1, n, null) : r.data[i],
    s = P0(r, t, o, n, e);
  (t[i] = s), Pu() && Yu(r, t, s, o), Vi(o, !1);
}
var P0 = (e, n, t, r, i) => (Ou(!0), Vw(n[De], r));
function Je(e) {
  return Kr("", e, ""), Je;
}
function Kr(e, n, t) {
  let r = ne(),
    i = Qm(r, e, n, t);
  return i !== Sn && BC(r, zr(), i), Kr;
}
function fe(e, n, t) {
  qm(n) && (n = n());
  let r = ne(),
    i = ha();
  if (qr(r, i, n)) {
    let o = ke(),
      s = pa();
    td(o, s, r, e, n, r[De], t, !1);
  }
  return fe;
}
function ge(e, n) {
  let t = qm(e);
  return t && e.set(n), t;
}
function he(e, n) {
  let t = ne(),
    r = ke(),
    i = Le();
  return Zm(r, t, t[De], i, e, n), he;
}
function O0(e, n, t) {
  let r = ke();
  if (r.firstCreatePass) {
    let i = En(e);
    pu(t, r.data, r.blueprint, i, !0), pu(n, r.data, r.blueprint, i, !1);
  }
}
function pu(e, n, t, r, i) {
  if (((e = Re(e)), Array.isArray(e)))
    for (let o = 0; o < e.length; o++) pu(e[o], n, t, r, i);
  else {
    let o = ke(),
      s = ne(),
      a = Le(),
      l = Or(e) ? e : Re(e.provide),
      c = ig(e),
      u = a.providerIndexes & 1048575,
      d = a.directiveStart,
      h = a.providerIndexes >> 20;
    if (Or(e) || !e.multi) {
      let f = new Zn(c, i, C),
        m = Rc(l, n, i ? u : u + h, d);
      m === -1
        ? (Wc(Vs(a, s), o, l),
          xc(o, e, n.length),
          n.push(l),
          a.directiveStart++,
          a.directiveEnd++,
          i && (a.providerIndexes += 1048576),
          t.push(f),
          s.push(f))
        : ((t[m] = f), (s[m] = f));
    } else {
      let f = Rc(l, n, u + h, d),
        m = Rc(l, n, u, u + h),
        y = f >= 0 && t[f],
        E = m >= 0 && t[m];
      if ((i && !E) || (!i && !y)) {
        Wc(Vs(a, s), o, l);
        let S = L0(i ? k0 : F0, t.length, i, r, c);
        !i && E && (t[m].providerFactory = S),
          xc(o, e, n.length, 0),
          n.push(l),
          a.directiveStart++,
          a.directiveEnd++,
          i && (a.providerIndexes += 1048576),
          t.push(S),
          s.push(S);
      } else {
        let S = Km(t[i ? m : f], c, !i && r);
        xc(o, e, f > -1 ? f : m, S);
      }
      !i && r && E && t[m].componentProviders++;
    }
  }
}
function xc(e, n, t, r) {
  let i = Or(n),
    o = cE(n);
  if (i || o) {
    let l = (o ? Re(n.useClass) : n).prototype.ngOnDestroy;
    if (l) {
      let c = e.destroyHooks || (e.destroyHooks = []);
      if (!i && n.multi) {
        let u = c.indexOf(t);
        u === -1 ? c.push(t, [r, l]) : c[u + 1].push(r, l);
      } else c.push(t, l);
    }
  }
}
function Km(e, n, t) {
  return t && e.componentProviders++, e.multi.push(n) - 1;
}
function Rc(e, n, t, r) {
  for (let i = t; i < r; i++) if (n[i] === e) return i;
  return -1;
}
function F0(e, n, t, r) {
  return gu(this.multi, []);
}
function k0(e, n, t, r) {
  let i = this.multi,
    o;
  if (this.providerFactory) {
    let s = this.providerFactory.componentProviders,
      a = Vr(t, t[z], this.providerFactory.index, r);
    (o = a.slice(0, s)), gu(i, o);
    for (let l = s; l < a.length; l++) o.push(a[l]);
  } else (o = []), gu(i, o);
  return o;
}
function gu(e, n) {
  for (let t = 0; t < e.length; t++) {
    let r = e[t];
    n.push(r());
  }
  return n;
}
function L0(e, n, t, r, i) {
  let o = new Zn(e, t, C);
  return (
    (o.multi = []),
    (o.index = n),
    (o.componentProviders = 0),
    Km(o, i, r && !t),
    o
  );
}
function Mn(e, n = []) {
  return (t) => {
    t.providersResolver = (r, i) => O0(r, i ? i(e) : e, n);
  };
}
function Ym(e, n, t, r) {
  return Jm(ne(), Eg(), e, n, t, r);
}
function V0(e, n) {
  let t = e[n];
  return t === Sn ? void 0 : t;
}
function Jm(e, n, t, r, i, o) {
  let s = n + t;
  return qr(e, s, i) ? e0(e, s + 1, o ? r.call(o, i) : r(i)) : V0(e, s + 1);
}
function xa(e, n) {
  let t = ke(),
    r,
    i = e + Nt;
  t.firstCreatePass
    ? ((r = j0(n, t.pipeRegistry)),
      (t.data[i] = r),
      r.onDestroy && (t.destroyHooks ??= []).push(i, r.onDestroy))
    : (r = t.data[i]);
  let o = r.factory || (r.factory = Gn(r.type, !0)),
    s,
    a = Ue(C);
  try {
    let l = Ls(!1),
      c = o();
    return Ls(l), R0(t, ne(), i, c), c;
  } finally {
    Ue(a);
  }
}
function j0(e, n) {
  if (n)
    for (let t = n.length - 1; t >= 0; t--) {
      let r = n[t];
      if (e === r.name) return r;
    }
}
function Ra(e, n, t) {
  let r = e + Nt,
    i = ne(),
    o = bE(i, r);
  return B0(i, r) ? Jm(i, Eg(), n, o.transform, t, o) : o.transform(t);
}
function B0(e, n) {
  return e[z].data[n].pure;
}
var vs = null;
function U0(e) {
  (vs !== null &&
    (e.defaultEncapsulation !== vs.defaultEncapsulation ||
      e.preserveWhitespaces !== vs.preserveWhitespaces)) ||
    (vs = e);
}
var mu = class {
    ngModuleFactory;
    componentFactories;
    constructor(n, t) {
      (this.ngModuleFactory = n), (this.componentFactories = t);
    }
  },
  Pa = (() => {
    class e {
      compileModuleSync(t) {
        return new Qs(t);
      }
      compileModuleAsync(t) {
        return Promise.resolve(this.compileModuleSync(t));
      }
      compileModuleAndAllComponentsSync(t) {
        let r = this.compileModuleSync(t),
          i = Yp(t),
          o = om(i.declarations).reduce((s, a) => {
            let l = _n(a);
            return l && s.push(new Ur(l)), s;
          }, []);
        return new mu(r, o);
      }
      compileModuleAndAllComponentsAsync(t) {
        return Promise.resolve(this.compileModuleAndAllComponentsSync(t));
      }
      clearCache() {}
      clearCacheFor(t) {}
      getModuleId(t) {}
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })(),
  $0 = new I("");
function H0(e, n, t) {
  let r = new Qs(t);
  return Promise.resolve(r);
}
function xp(e) {
  for (let n = e.length - 1; n >= 0; n--) if (e[n] !== void 0) return e[n];
}
var z0 = (() => {
  class e {
    zone = v(ee);
    changeDetectionScheduler = v(jr);
    applicationRef = v(en);
    _onMicrotaskEmptySubscription;
    initialize() {
      this._onMicrotaskEmptySubscription ||
        (this._onMicrotaskEmptySubscription =
          this.zone.onMicrotaskEmpty.subscribe({
            next: () => {
              this.changeDetectionScheduler.runningTick ||
                this.zone.run(() => {
                  this.applicationRef.tick();
                });
            },
          }));
    }
    ngOnDestroy() {
      this._onMicrotaskEmptySubscription?.unsubscribe();
    }
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" });
  }
  return e;
})();
function G0({
  ngZoneFactory: e,
  ignoreChangesOutsideZone: n,
  scheduleInRootZone: t,
}) {
  return (
    (e ??= () => new ee(q(w({}, Xm()), { scheduleInRootZone: t }))),
    [
      { provide: ee, useFactory: e },
      {
        provide: Pr,
        multi: !0,
        useFactory: () => {
          let r = v(z0, { optional: !0 });
          return () => r.initialize();
        },
      },
      {
        provide: Pr,
        multi: !0,
        useFactory: () => {
          let r = v(q0);
          return () => {
            r.initialize();
          };
        },
      },
      n === !0 ? { provide: $g, useValue: !0 } : [],
      { provide: Hg, useValue: t ?? Ug },
    ]
  );
}
function Xm(e) {
  return {
    enableLongStackTrace: !1,
    shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
    shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1,
  };
}
var q0 = (() => {
  class e {
    subscription = new me();
    initialized = !1;
    zone = v(ee);
    pendingTasks = v(Jt);
    initialize() {
      if (this.initialized) return;
      this.initialized = !0;
      let t = null;
      !this.zone.isStable &&
        !this.zone.hasPendingMacrotasks &&
        !this.zone.hasPendingMicrotasks &&
        (t = this.pendingTasks.add()),
        this.zone.runOutsideAngular(() => {
          this.subscription.add(
            this.zone.onStable.subscribe(() => {
              ee.assertNotInAngularZone(),
                queueMicrotask(() => {
                  t !== null &&
                    !this.zone.hasPendingMacrotasks &&
                    !this.zone.hasPendingMicrotasks &&
                    (this.pendingTasks.remove(t), (t = null));
                });
            })
          );
        }),
        this.subscription.add(
          this.zone.onUnstable.subscribe(() => {
            ee.assertInAngularZone(), (t ??= this.pendingTasks.add());
          })
        );
    }
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" });
  }
  return e;
})();
var W0 = (() => {
  class e {
    appRef = v(en);
    taskService = v(Jt);
    ngZone = v(ee);
    zonelessEnabled = v(ju);
    disableScheduling = v($g, { optional: !0 }) ?? !1;
    zoneIsDefined = typeof Zone < "u" && !!Zone.root.run;
    schedulerTickApplyArgs = [{ data: { __scheduler_tick__: !0 } }];
    subscriptions = new me();
    angularZoneId = this.zoneIsDefined ? this.ngZone._inner?.get(Bs) : null;
    scheduleInRootZone =
      !this.zonelessEnabled &&
      this.zoneIsDefined &&
      (v(Hg, { optional: !0 }) ?? !1);
    cancelScheduledCallback = null;
    useMicrotaskScheduler = !1;
    runningTick = !1;
    pendingRenderTaskId = null;
    constructor() {
      this.subscriptions.add(
        this.appRef.afterTick.subscribe(() => {
          this.runningTick || this.cleanup();
        })
      ),
        this.subscriptions.add(
          this.ngZone.onUnstable.subscribe(() => {
            this.runningTick || this.cleanup();
          })
        ),
        (this.disableScheduling ||=
          !this.zonelessEnabled &&
          (this.ngZone instanceof Us || !this.zoneIsDefined));
    }
    notify(t) {
      if (!this.zonelessEnabled && t === 5) return;
      let r = !1;
      switch (t) {
        case 0: {
          this.appRef.dirtyFlags |= 2;
          break;
        }
        case 3:
        case 2:
        case 4:
        case 5:
        case 1: {
          this.appRef.dirtyFlags |= 4;
          break;
        }
        case 8: {
          this.appRef.deferredDirtyFlags |= 8;
          break;
        }
        case 6: {
          (this.appRef.dirtyFlags |= 2), (r = !0);
          break;
        }
        case 13: {
          (this.appRef.dirtyFlags |= 16), (r = !0);
          break;
        }
        case 14: {
          (this.appRef.dirtyFlags |= 2), (r = !0);
          break;
        }
        case 12: {
          r = !0;
          break;
        }
        case 10:
        case 9:
        case 7:
        case 11:
        default:
          this.appRef.dirtyFlags |= 8;
      }
      if (!this.shouldScheduleTick(r)) return;
      let i = this.useMicrotaskScheduler ? ap : zg;
      (this.pendingRenderTaskId = this.taskService.add()),
        this.scheduleInRootZone
          ? (this.cancelScheduledCallback = Zone.root.run(() =>
              i(() => this.tick())
            ))
          : (this.cancelScheduledCallback = this.ngZone.runOutsideAngular(() =>
              i(() => this.tick())
            ));
    }
    shouldScheduleTick(t) {
      return !(
        (this.disableScheduling && !t) ||
        this.appRef.destroyed ||
        this.pendingRenderTaskId !== null ||
        this.runningTick ||
        this.appRef._runningTick ||
        (!this.zonelessEnabled &&
          this.zoneIsDefined &&
          Zone.current.get(Bs + this.angularZoneId))
      );
    }
    tick() {
      if (this.runningTick || this.appRef.destroyed) return;
      if (this.appRef.dirtyFlags === 0) {
        this.cleanup();
        return;
      }
      !this.zonelessEnabled &&
        this.appRef.dirtyFlags & 7 &&
        (this.appRef.dirtyFlags |= 1);
      let t = this.taskService.add();
      try {
        this.ngZone.run(
          () => {
            (this.runningTick = !0), this.appRef._tick();
          },
          void 0,
          this.schedulerTickApplyArgs
        );
      } catch (r) {
        throw (this.taskService.remove(t), r);
      } finally {
        this.cleanup();
      }
      (this.useMicrotaskScheduler = !0),
        ap(() => {
          (this.useMicrotaskScheduler = !1), this.taskService.remove(t);
        });
    }
    ngOnDestroy() {
      this.subscriptions.unsubscribe(), this.cleanup();
    }
    cleanup() {
      if (
        ((this.runningTick = !1),
        this.cancelScheduledCallback?.(),
        (this.cancelScheduledCallback = null),
        this.pendingRenderTaskId !== null)
      ) {
        let t = this.pendingRenderTaskId;
        (this.pendingRenderTaskId = null), this.taskService.remove(t);
      }
    }
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" });
  }
  return e;
})();
function Q0() {
  return (typeof $localize < "u" && $localize.locale) || Ys;
}
var Oa = new I("", {
    providedIn: "root",
    factory: () => v(Oa, $.Optional | $.SkipSelf) || Q0(),
  }),
  ey = new I("", { providedIn: "root", factory: () => M0 });
var Js = new I("");
function Ds(e) {
  return !e.moduleRef;
}
function Z0(e) {
  let n = Ds(e) ? e.r3Injector : e.moduleRef.injector,
    t = n.get(ee);
  return t.run(() => {
    Ds(e)
      ? e.r3Injector.resolveInjectorInitializers()
      : e.moduleRef.resolveInjectorInitializers();
    let r = n.get(Qt, null),
      i;
    if (
      (t.runOutsideAngular(() => {
        i = t.onError.subscribe({
          next: (o) => {
            r.handleError(o);
          },
        });
      }),
      Ds(e))
    ) {
      let o = () => n.destroy(),
        s = e.platformInjector.get(Js);
      s.add(o),
        n.onDestroy(() => {
          i.unsubscribe(), s.delete(o);
        });
    } else {
      let o = () => e.moduleRef.destroy(),
        s = e.platformInjector.get(Js);
      s.add(o),
        e.moduleRef.onDestroy(() => {
          Cs(e.allPlatformModules, e.moduleRef), i.unsubscribe(), s.delete(o);
        });
    }
    return Ab(r, t, () => {
      let o = n.get(Hm);
      return (
        o.runInitializers(),
        o.donePromise.then(() => {
          let s = n.get(Oa, Ys);
          if ((A0(s || Ys), Ds(e))) {
            let a = n.get(en);
            return (
              e.rootComponent !== void 0 && a.bootstrap(e.rootComponent), a
            );
          } else return K0(e.moduleRef, e.allPlatformModules), e.moduleRef;
        })
      );
    });
  });
}
function K0(e, n) {
  let t = e.injector.get(en);
  if (e._bootstrapComponents.length > 0)
    e._bootstrapComponents.forEach((r) => t.bootstrap(r));
  else if (e.instance.ngDoBootstrap) e.instance.ngDoBootstrap(t);
  else throw new D(-403, !1);
  n.push(e);
}
var ty = (() => {
    class e {
      _injector;
      _modules = [];
      _destroyListeners = [];
      _destroyed = !1;
      constructor(t) {
        this._injector = t;
      }
      bootstrapModuleFactory(t, r) {
        let i = r?.scheduleInRootZone,
          o = () =>
            gw(
              r?.ngZone,
              q(
                w(
                  {},
                  Xm({
                    eventCoalescing: r?.ngZoneEventCoalescing,
                    runCoalescing: r?.ngZoneRunCoalescing,
                  })
                ),
                { scheduleInRootZone: i }
              )
            ),
          s = r?.ignoreChangesOutsideZone,
          a = [
            G0({ ngZoneFactory: o, ignoreChangesOutsideZone: s }),
            { provide: jr, useExisting: W0 },
          ],
          l = vb(t.moduleType, this.injector, a);
        return Z0({
          moduleRef: l,
          allPlatformModules: this._modules,
          platformInjector: this.injector,
        });
      }
      bootstrapModule(t, r = []) {
        let i = zm({}, r);
        return H0(this.injector, i, t).then((o) =>
          this.bootstrapModuleFactory(o, i)
        );
      }
      onDestroy(t) {
        this._destroyListeners.push(t);
      }
      get injector() {
        return this._injector;
      }
      destroy() {
        if (this._destroyed) throw new D(404, !1);
        this._modules.slice().forEach((r) => r.destroy()),
          this._destroyListeners.forEach((r) => r());
        let t = this._injector.get(Js, null);
        t && (t.forEach((r) => r()), t.clear()), (this._destroyed = !0);
      }
      get destroyed() {
        return this._destroyed;
      }
      static ɵfac = function (r) {
        return new (r || e)(M(Ye));
      };
      static ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "platform" });
    }
    return e;
  })(),
  Ti = null,
  ny = new I("");
function Y0(e) {
  if (Ti && !Ti.get(ny, !1)) throw new D(400, !1);
  Sb(), (Ti = e);
  let n = e.get(ty);
  return eI(e), n;
}
function cd(e, n, t = []) {
  let r = `Platform: ${n}`,
    i = new I(r);
  return (o = []) => {
    let s = ry();
    if (!s || s.injector.get(ny, !1)) {
      let a = [...t, ...o, { provide: i, useValue: !0 }];
      e ? e(a) : Y0(J0(a, r));
    }
    return X0(i);
  };
}
function J0(e = [], n) {
  return Ye.create({
    name: n,
    providers: [
      { provide: sa, useValue: "platform" },
      { provide: Js, useValue: new Set([() => (Ti = null)]) },
      ...e,
    ],
  });
}
function X0(e) {
  let n = ry();
  if (!n) throw new D(401, !1);
  return n;
}
function ry() {
  return Ti?.get(ty) ?? null;
}
function eI(e) {
  let n = e.get(Hu, null);
  $e(e, () => {
    n?.forEach((t) => t());
  });
}
var ir = (() => {
  class e {
    static __NG_ELEMENT_ID__ = tI;
  }
  return e;
})();
function tI(e) {
  return nI(Le(), ne(), (e & 16) === 16);
}
function nI(e, n, t) {
  if (la(e) && !t) {
    let r = In(e.index, n);
    return new Yn(r, r);
  } else if (e.type & 175) {
    let r = n[At];
    return new Yn(r, n);
  }
  return null;
}
var yu = class {
    constructor() {}
    supports(n) {
      return Wm(n);
    }
    create(n) {
      return new vu(n);
    }
  },
  rI = (e, n) => n,
  vu = class {
    length = 0;
    collection;
    _linkedRecords = null;
    _unlinkedRecords = null;
    _previousItHead = null;
    _itHead = null;
    _itTail = null;
    _additionsHead = null;
    _additionsTail = null;
    _movesHead = null;
    _movesTail = null;
    _removalsHead = null;
    _removalsTail = null;
    _identityChangesHead = null;
    _identityChangesTail = null;
    _trackByFn;
    constructor(n) {
      this._trackByFn = n || rI;
    }
    forEachItem(n) {
      let t;
      for (t = this._itHead; t !== null; t = t._next) n(t);
    }
    forEachOperation(n) {
      let t = this._itHead,
        r = this._removalsHead,
        i = 0,
        o = null;
      for (; t || r; ) {
        let s = !r || (t && t.currentIndex < Rp(r, i, o)) ? t : r,
          a = Rp(s, i, o),
          l = s.currentIndex;
        if (s === r) i--, (r = r._nextRemoved);
        else if (((t = t._next), s.previousIndex == null)) i++;
        else {
          o || (o = []);
          let c = a - i,
            u = l - i;
          if (c != u) {
            for (let h = 0; h < c; h++) {
              let f = h < o.length ? o[h] : (o[h] = 0),
                m = f + h;
              u <= m && m < c && (o[h] = f + 1);
            }
            let d = s.previousIndex;
            o[d] = u - c;
          }
        }
        a !== l && n(s, a, l);
      }
    }
    forEachPreviousItem(n) {
      let t;
      for (t = this._previousItHead; t !== null; t = t._nextPrevious) n(t);
    }
    forEachAddedItem(n) {
      let t;
      for (t = this._additionsHead; t !== null; t = t._nextAdded) n(t);
    }
    forEachMovedItem(n) {
      let t;
      for (t = this._movesHead; t !== null; t = t._nextMoved) n(t);
    }
    forEachRemovedItem(n) {
      let t;
      for (t = this._removalsHead; t !== null; t = t._nextRemoved) n(t);
    }
    forEachIdentityChange(n) {
      let t;
      for (t = this._identityChangesHead; t !== null; t = t._nextIdentityChange)
        n(t);
    }
    diff(n) {
      if ((n == null && (n = []), !Wm(n))) throw new D(900, !1);
      return this.check(n) ? this : null;
    }
    onDestroy() {}
    check(n) {
      this._reset();
      let t = this._itHead,
        r = !1,
        i,
        o,
        s;
      if (Array.isArray(n)) {
        this.length = n.length;
        for (let a = 0; a < this.length; a++)
          (o = n[a]),
            (s = this._trackByFn(a, o)),
            t === null || !Object.is(t.trackById, s)
              ? ((t = this._mismatch(t, o, s, a)), (r = !0))
              : (r && (t = this._verifyReinsertion(t, o, s, a)),
                Object.is(t.item, o) || this._addIdentityChange(t, o)),
            (t = t._next);
      } else
        (i = 0),
          Xb(n, (a) => {
            (s = this._trackByFn(i, a)),
              t === null || !Object.is(t.trackById, s)
                ? ((t = this._mismatch(t, a, s, i)), (r = !0))
                : (r && (t = this._verifyReinsertion(t, a, s, i)),
                  Object.is(t.item, a) || this._addIdentityChange(t, a)),
              (t = t._next),
              i++;
          }),
          (this.length = i);
      return this._truncate(t), (this.collection = n), this.isDirty;
    }
    get isDirty() {
      return (
        this._additionsHead !== null ||
        this._movesHead !== null ||
        this._removalsHead !== null ||
        this._identityChangesHead !== null
      );
    }
    _reset() {
      if (this.isDirty) {
        let n;
        for (n = this._previousItHead = this._itHead; n !== null; n = n._next)
          n._nextPrevious = n._next;
        for (n = this._additionsHead; n !== null; n = n._nextAdded)
          n.previousIndex = n.currentIndex;
        for (
          this._additionsHead = this._additionsTail = null, n = this._movesHead;
          n !== null;
          n = n._nextMoved
        )
          n.previousIndex = n.currentIndex;
        (this._movesHead = this._movesTail = null),
          (this._removalsHead = this._removalsTail = null),
          (this._identityChangesHead = this._identityChangesTail = null);
      }
    }
    _mismatch(n, t, r, i) {
      let o;
      return (
        n === null ? (o = this._itTail) : ((o = n._prev), this._remove(n)),
        (n =
          this._unlinkedRecords === null
            ? null
            : this._unlinkedRecords.get(r, null)),
        n !== null
          ? (Object.is(n.item, t) || this._addIdentityChange(n, t),
            this._reinsertAfter(n, o, i))
          : ((n =
              this._linkedRecords === null
                ? null
                : this._linkedRecords.get(r, i)),
            n !== null
              ? (Object.is(n.item, t) || this._addIdentityChange(n, t),
                this._moveAfter(n, o, i))
              : (n = this._addAfter(new Du(t, r), o, i))),
        n
      );
    }
    _verifyReinsertion(n, t, r, i) {
      let o =
        this._unlinkedRecords === null
          ? null
          : this._unlinkedRecords.get(r, null);
      return (
        o !== null
          ? (n = this._reinsertAfter(o, n._prev, i))
          : n.currentIndex != i &&
            ((n.currentIndex = i), this._addToMoves(n, i)),
        n
      );
    }
    _truncate(n) {
      for (; n !== null; ) {
        let t = n._next;
        this._addToRemovals(this._unlink(n)), (n = t);
      }
      this._unlinkedRecords !== null && this._unlinkedRecords.clear(),
        this._additionsTail !== null && (this._additionsTail._nextAdded = null),
        this._movesTail !== null && (this._movesTail._nextMoved = null),
        this._itTail !== null && (this._itTail._next = null),
        this._removalsTail !== null && (this._removalsTail._nextRemoved = null),
        this._identityChangesTail !== null &&
          (this._identityChangesTail._nextIdentityChange = null);
    }
    _reinsertAfter(n, t, r) {
      this._unlinkedRecords !== null && this._unlinkedRecords.remove(n);
      let i = n._prevRemoved,
        o = n._nextRemoved;
      return (
        i === null ? (this._removalsHead = o) : (i._nextRemoved = o),
        o === null ? (this._removalsTail = i) : (o._prevRemoved = i),
        this._insertAfter(n, t, r),
        this._addToMoves(n, r),
        n
      );
    }
    _moveAfter(n, t, r) {
      return (
        this._unlink(n), this._insertAfter(n, t, r), this._addToMoves(n, r), n
      );
    }
    _addAfter(n, t, r) {
      return (
        this._insertAfter(n, t, r),
        this._additionsTail === null
          ? (this._additionsTail = this._additionsHead = n)
          : (this._additionsTail = this._additionsTail._nextAdded = n),
        n
      );
    }
    _insertAfter(n, t, r) {
      let i = t === null ? this._itHead : t._next;
      return (
        (n._next = i),
        (n._prev = t),
        i === null ? (this._itTail = n) : (i._prev = n),
        t === null ? (this._itHead = n) : (t._next = n),
        this._linkedRecords === null && (this._linkedRecords = new Xs()),
        this._linkedRecords.put(n),
        (n.currentIndex = r),
        n
      );
    }
    _remove(n) {
      return this._addToRemovals(this._unlink(n));
    }
    _unlink(n) {
      this._linkedRecords !== null && this._linkedRecords.remove(n);
      let t = n._prev,
        r = n._next;
      return (
        t === null ? (this._itHead = r) : (t._next = r),
        r === null ? (this._itTail = t) : (r._prev = t),
        n
      );
    }
    _addToMoves(n, t) {
      return (
        n.previousIndex === t ||
          (this._movesTail === null
            ? (this._movesTail = this._movesHead = n)
            : (this._movesTail = this._movesTail._nextMoved = n)),
        n
      );
    }
    _addToRemovals(n) {
      return (
        this._unlinkedRecords === null && (this._unlinkedRecords = new Xs()),
        this._unlinkedRecords.put(n),
        (n.currentIndex = null),
        (n._nextRemoved = null),
        this._removalsTail === null
          ? ((this._removalsTail = this._removalsHead = n),
            (n._prevRemoved = null))
          : ((n._prevRemoved = this._removalsTail),
            (this._removalsTail = this._removalsTail._nextRemoved = n)),
        n
      );
    }
    _addIdentityChange(n, t) {
      return (
        (n.item = t),
        this._identityChangesTail === null
          ? (this._identityChangesTail = this._identityChangesHead = n)
          : (this._identityChangesTail =
              this._identityChangesTail._nextIdentityChange =
                n),
        n
      );
    }
  },
  Du = class {
    item;
    trackById;
    currentIndex = null;
    previousIndex = null;
    _nextPrevious = null;
    _prev = null;
    _next = null;
    _prevDup = null;
    _nextDup = null;
    _prevRemoved = null;
    _nextRemoved = null;
    _nextAdded = null;
    _nextMoved = null;
    _nextIdentityChange = null;
    constructor(n, t) {
      (this.item = n), (this.trackById = t);
    }
  },
  _u = class {
    _head = null;
    _tail = null;
    add(n) {
      this._head === null
        ? ((this._head = this._tail = n),
          (n._nextDup = null),
          (n._prevDup = null))
        : ((this._tail._nextDup = n),
          (n._prevDup = this._tail),
          (n._nextDup = null),
          (this._tail = n));
    }
    get(n, t) {
      let r;
      for (r = this._head; r !== null; r = r._nextDup)
        if ((t === null || t <= r.currentIndex) && Object.is(r.trackById, n))
          return r;
      return null;
    }
    remove(n) {
      let t = n._prevDup,
        r = n._nextDup;
      return (
        t === null ? (this._head = r) : (t._nextDup = r),
        r === null ? (this._tail = t) : (r._prevDup = t),
        this._head === null
      );
    }
  },
  Xs = class {
    map = new Map();
    put(n) {
      let t = n.trackById,
        r = this.map.get(t);
      r || ((r = new _u()), this.map.set(t, r)), r.add(n);
    }
    get(n, t) {
      let r = n,
        i = this.map.get(r);
      return i ? i.get(n, t) : null;
    }
    remove(n) {
      let t = n.trackById;
      return this.map.get(t).remove(n) && this.map.delete(t), n;
    }
    get isEmpty() {
      return this.map.size === 0;
    }
    clear() {
      this.map.clear();
    }
  };
function Rp(e, n, t) {
  let r = e.previousIndex;
  if (r === null) return r;
  let i = 0;
  return t && r < t.length && (i = t[r]), r + n + i;
}
var Eu = class {
    constructor() {}
    supports(n) {
      return n instanceof Map || ld(n);
    }
    create() {
      return new wu();
    }
  },
  wu = class {
    _records = new Map();
    _mapHead = null;
    _appendAfter = null;
    _previousMapHead = null;
    _changesHead = null;
    _changesTail = null;
    _additionsHead = null;
    _additionsTail = null;
    _removalsHead = null;
    _removalsTail = null;
    get isDirty() {
      return (
        this._additionsHead !== null ||
        this._changesHead !== null ||
        this._removalsHead !== null
      );
    }
    forEachItem(n) {
      let t;
      for (t = this._mapHead; t !== null; t = t._next) n(t);
    }
    forEachPreviousItem(n) {
      let t;
      for (t = this._previousMapHead; t !== null; t = t._nextPrevious) n(t);
    }
    forEachChangedItem(n) {
      let t;
      for (t = this._changesHead; t !== null; t = t._nextChanged) n(t);
    }
    forEachAddedItem(n) {
      let t;
      for (t = this._additionsHead; t !== null; t = t._nextAdded) n(t);
    }
    forEachRemovedItem(n) {
      let t;
      for (t = this._removalsHead; t !== null; t = t._nextRemoved) n(t);
    }
    diff(n) {
      if (!n) n = new Map();
      else if (!(n instanceof Map || ld(n))) throw new D(900, !1);
      return this.check(n) ? this : null;
    }
    onDestroy() {}
    check(n) {
      this._reset();
      let t = this._mapHead;
      if (
        ((this._appendAfter = null),
        this._forEach(n, (r, i) => {
          if (t && t.key === i)
            this._maybeAddToChanges(t, r),
              (this._appendAfter = t),
              (t = t._next);
          else {
            let o = this._getOrCreateRecordForKey(i, r);
            t = this._insertBeforeOrAppend(t, o);
          }
        }),
        t)
      ) {
        t._prev && (t._prev._next = null), (this._removalsHead = t);
        for (let r = t; r !== null; r = r._nextRemoved)
          r === this._mapHead && (this._mapHead = null),
            this._records.delete(r.key),
            (r._nextRemoved = r._next),
            (r.previousValue = r.currentValue),
            (r.currentValue = null),
            (r._prev = null),
            (r._next = null);
      }
      return (
        this._changesTail && (this._changesTail._nextChanged = null),
        this._additionsTail && (this._additionsTail._nextAdded = null),
        this.isDirty
      );
    }
    _insertBeforeOrAppend(n, t) {
      if (n) {
        let r = n._prev;
        return (
          (t._next = n),
          (t._prev = r),
          (n._prev = t),
          r && (r._next = t),
          n === this._mapHead && (this._mapHead = t),
          (this._appendAfter = n),
          n
        );
      }
      return (
        this._appendAfter
          ? ((this._appendAfter._next = t), (t._prev = this._appendAfter))
          : (this._mapHead = t),
        (this._appendAfter = t),
        null
      );
    }
    _getOrCreateRecordForKey(n, t) {
      if (this._records.has(n)) {
        let i = this._records.get(n);
        this._maybeAddToChanges(i, t);
        let o = i._prev,
          s = i._next;
        return (
          o && (o._next = s),
          s && (s._prev = o),
          (i._next = null),
          (i._prev = null),
          i
        );
      }
      let r = new Cu(n);
      return (
        this._records.set(n, r),
        (r.currentValue = t),
        this._addToAdditions(r),
        r
      );
    }
    _reset() {
      if (this.isDirty) {
        let n;
        for (
          this._previousMapHead = this._mapHead, n = this._previousMapHead;
          n !== null;
          n = n._next
        )
          n._nextPrevious = n._next;
        for (n = this._changesHead; n !== null; n = n._nextChanged)
          n.previousValue = n.currentValue;
        for (n = this._additionsHead; n != null; n = n._nextAdded)
          n.previousValue = n.currentValue;
        (this._changesHead = this._changesTail = null),
          (this._additionsHead = this._additionsTail = null),
          (this._removalsHead = null);
      }
    }
    _maybeAddToChanges(n, t) {
      Object.is(t, n.currentValue) ||
        ((n.previousValue = n.currentValue),
        (n.currentValue = t),
        this._addToChanges(n));
    }
    _addToAdditions(n) {
      this._additionsHead === null
        ? (this._additionsHead = this._additionsTail = n)
        : ((this._additionsTail._nextAdded = n), (this._additionsTail = n));
    }
    _addToChanges(n) {
      this._changesHead === null
        ? (this._changesHead = this._changesTail = n)
        : ((this._changesTail._nextChanged = n), (this._changesTail = n));
    }
    _forEach(n, t) {
      n instanceof Map
        ? n.forEach(t)
        : Object.keys(n).forEach((r) => t(n[r], r));
    }
  },
  Cu = class {
    key;
    previousValue = null;
    currentValue = null;
    _nextPrevious = null;
    _next = null;
    _prev = null;
    _nextAdded = null;
    _nextRemoved = null;
    _nextChanged = null;
    constructor(n) {
      this.key = n;
    }
  };
function Pp() {
  return new ud([new yu()]);
}
var ud = (() => {
  class e {
    factories;
    static ɵprov = b({ token: e, providedIn: "root", factory: Pp });
    constructor(t) {
      this.factories = t;
    }
    static create(t, r) {
      if (r != null) {
        let i = r.factories.slice();
        t = t.concat(i);
      }
      return new e(t);
    }
    static extend(t) {
      return {
        provide: e,
        useFactory: (r) => e.create(t, r || Pp()),
        deps: [[e, new ia(), new ki()]],
      };
    }
    find(t) {
      let r = this.factories.find((i) => i.supports(t));
      if (r != null) return r;
      throw new D(901, !1);
    }
  }
  return e;
})();
function Op() {
  return new dd([new Eu()]);
}
var dd = (() => {
  class e {
    static ɵprov = b({ token: e, providedIn: "root", factory: Op });
    factories;
    constructor(t) {
      this.factories = t;
    }
    static create(t, r) {
      if (r) {
        let i = r.factories.slice();
        t = t.concat(i);
      }
      return new e(t);
    }
    static extend(t) {
      return {
        provide: e,
        useFactory: (r) => e.create(t, r || Op()),
        deps: [[e, new ia(), new ki()]],
      };
    }
    find(t) {
      let r = this.factories.find((i) => i.supports(t));
      if (r) return r;
      throw new D(901, !1);
    }
  }
  return e;
})();
var iy = cd(null, "core", []),
  oy = (() => {
    class e {
      constructor(t) {}
      static ɵfac = function (r) {
        return new (r || e)(M(en));
      };
      static ɵmod = Se({ type: e });
      static ɵinj = Ie({});
    }
    return e;
  })();
function Tn(e) {
  return typeof e == "boolean" ? e : e != null && e !== "false";
}
function Hi(e, n) {
  er("NgSignals");
  let t = yh(e);
  return n?.equal && (t[We].equal = n.equal), t;
}
function tn(e) {
  let n = Y(null);
  try {
    return e();
  } finally {
    Y(n);
  }
}
var Fp = class {
  [We];
  constructor(n) {
    this[We] = n;
  }
  destroy() {
    this[We].destroy();
  }
};
function sy(e) {
  let n = _n(e);
  if (!n) return null;
  let t = new Ur(n);
  return {
    get selector() {
      return t.selector;
    },
    get type() {
      return t.componentType;
    },
    get inputs() {
      return t.inputs;
    },
    get outputs() {
      return t.outputs;
    },
    get ngContentSelectors() {
      return t.ngContentSelectors;
    },
    get isStandalone() {
      return n.standalone;
    },
    get isSignal() {
      return n.signals;
    },
  };
}
var hy = null;
function kt() {
  return hy;
}
function py(e) {
  hy ??= e;
}
var Fa = class {};
var Me = new I(""),
  Dd = (() => {
    class e {
      historyGo(t) {
        throw new Error("");
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = b({
        token: e,
        factory: () => v(oI),
        providedIn: "platform",
      });
    }
    return e;
  })(),
  gy = new I(""),
  oI = (() => {
    class e extends Dd {
      _location;
      _history;
      _doc = v(Me);
      constructor() {
        super(),
          (this._location = window.location),
          (this._history = window.history);
      }
      getBaseHrefFromDOM() {
        return kt().getBaseHref(this._doc);
      }
      onPopState(t) {
        let r = kt().getGlobalEventTarget(this._doc, "window");
        return (
          r.addEventListener("popstate", t, !1),
          () => r.removeEventListener("popstate", t)
        );
      }
      onHashChange(t) {
        let r = kt().getGlobalEventTarget(this._doc, "window");
        return (
          r.addEventListener("hashchange", t, !1),
          () => r.removeEventListener("hashchange", t)
        );
      }
      get href() {
        return this._location.href;
      }
      get protocol() {
        return this._location.protocol;
      }
      get hostname() {
        return this._location.hostname;
      }
      get port() {
        return this._location.port;
      }
      get pathname() {
        return this._location.pathname;
      }
      get search() {
        return this._location.search;
      }
      get hash() {
        return this._location.hash;
      }
      set pathname(t) {
        this._location.pathname = t;
      }
      pushState(t, r, i) {
        this._history.pushState(t, r, i);
      }
      replaceState(t, r, i) {
        this._history.replaceState(t, r, i);
      }
      forward() {
        this._history.forward();
      }
      back() {
        this._history.back();
      }
      historyGo(t = 0) {
        this._history.go(t);
      }
      getState() {
        return this._history.state;
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = b({
        token: e,
        factory: () => new e(),
        providedIn: "platform",
      });
    }
    return e;
  })();
function _d(e, n) {
  if (e.length == 0) return n;
  if (n.length == 0) return e;
  let t = 0;
  return (
    e.endsWith("/") && t++,
    n.startsWith("/") && t++,
    t == 2 ? e + n.substring(1) : t == 1 ? e + n : e + "/" + n
  );
}
function ay(e) {
  let n = e.match(/#|\?|$/),
    t = (n && n.index) || e.length,
    r = t - (e[t - 1] === "/" ? 1 : 0);
  return e.slice(0, r) + e.slice(t);
}
function nn(e) {
  return e && e[0] !== "?" ? "?" + e : e;
}
var on = (() => {
    class e {
      historyGo(t) {
        throw new Error("");
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = b({ token: e, factory: () => v(Ed), providedIn: "root" });
    }
    return e;
  })(),
  my = new I(""),
  Ed = (() => {
    class e extends on {
      _platformLocation;
      _baseHref;
      _removeListenerFns = [];
      constructor(t, r) {
        super(),
          (this._platformLocation = t),
          (this._baseHref =
            r ??
            this._platformLocation.getBaseHrefFromDOM() ??
            v(Me).location?.origin ??
            "");
      }
      ngOnDestroy() {
        for (; this._removeListenerFns.length; )
          this._removeListenerFns.pop()();
      }
      onPopState(t) {
        this._removeListenerFns.push(
          this._platformLocation.onPopState(t),
          this._platformLocation.onHashChange(t)
        );
      }
      getBaseHref() {
        return this._baseHref;
      }
      prepareExternalUrl(t) {
        return _d(this._baseHref, t);
      }
      path(t = !1) {
        let r =
            this._platformLocation.pathname + nn(this._platformLocation.search),
          i = this._platformLocation.hash;
        return i && t ? `${r}${i}` : r;
      }
      pushState(t, r, i, o) {
        let s = this.prepareExternalUrl(i + nn(o));
        this._platformLocation.pushState(t, r, s);
      }
      replaceState(t, r, i, o) {
        let s = this.prepareExternalUrl(i + nn(o));
        this._platformLocation.replaceState(t, r, s);
      }
      forward() {
        this._platformLocation.forward();
      }
      back() {
        this._platformLocation.back();
      }
      getState() {
        return this._platformLocation.getState();
      }
      historyGo(t = 0) {
        this._platformLocation.historyGo?.(t);
      }
      static ɵfac = function (r) {
        return new (r || e)(M(Dd), M(my, 8));
      };
      static ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })(),
  yy = (() => {
    class e extends on {
      _platformLocation;
      _baseHref = "";
      _removeListenerFns = [];
      constructor(t, r) {
        super(),
          (this._platformLocation = t),
          r != null && (this._baseHref = r);
      }
      ngOnDestroy() {
        for (; this._removeListenerFns.length; )
          this._removeListenerFns.pop()();
      }
      onPopState(t) {
        this._removeListenerFns.push(
          this._platformLocation.onPopState(t),
          this._platformLocation.onHashChange(t)
        );
      }
      getBaseHref() {
        return this._baseHref;
      }
      path(t = !1) {
        let r = this._platformLocation.hash ?? "#";
        return r.length > 0 ? r.substring(1) : r;
      }
      prepareExternalUrl(t) {
        let r = _d(this._baseHref, t);
        return r.length > 0 ? "#" + r : r;
      }
      pushState(t, r, i, o) {
        let s = this.prepareExternalUrl(i + nn(o));
        s.length == 0 && (s = this._platformLocation.pathname),
          this._platformLocation.pushState(t, r, s);
      }
      replaceState(t, r, i, o) {
        let s = this.prepareExternalUrl(i + nn(o));
        s.length == 0 && (s = this._platformLocation.pathname),
          this._platformLocation.replaceState(t, r, s);
      }
      forward() {
        this._platformLocation.forward();
      }
      back() {
        this._platformLocation.back();
      }
      getState() {
        return this._platformLocation.getState();
      }
      historyGo(t = 0) {
        this._platformLocation.historyGo?.(t);
      }
      static ɵfac = function (r) {
        return new (r || e)(M(Dd), M(my, 8));
      };
      static ɵprov = b({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  Jr = (() => {
    class e {
      _subject = new Ee();
      _basePath;
      _locationStrategy;
      _urlChangeListeners = [];
      _urlChangeSubscription = null;
      constructor(t) {
        this._locationStrategy = t;
        let r = this._locationStrategy.getBaseHref();
        (this._basePath = lI(ay(ly(r)))),
          this._locationStrategy.onPopState((i) => {
            this._subject.next({
              url: this.path(!0),
              pop: !0,
              state: i.state,
              type: i.type,
            });
          });
      }
      ngOnDestroy() {
        this._urlChangeSubscription?.unsubscribe(),
          (this._urlChangeListeners = []);
      }
      path(t = !1) {
        return this.normalize(this._locationStrategy.path(t));
      }
      getState() {
        return this._locationStrategy.getState();
      }
      isCurrentPathEqualTo(t, r = "") {
        return this.path() == this.normalize(t + nn(r));
      }
      normalize(t) {
        return e.stripTrailingSlash(aI(this._basePath, ly(t)));
      }
      prepareExternalUrl(t) {
        return (
          t && t[0] !== "/" && (t = "/" + t),
          this._locationStrategy.prepareExternalUrl(t)
        );
      }
      go(t, r = "", i = null) {
        this._locationStrategy.pushState(i, "", t, r),
          this._notifyUrlChangeListeners(this.prepareExternalUrl(t + nn(r)), i);
      }
      replaceState(t, r = "", i = null) {
        this._locationStrategy.replaceState(i, "", t, r),
          this._notifyUrlChangeListeners(this.prepareExternalUrl(t + nn(r)), i);
      }
      forward() {
        this._locationStrategy.forward();
      }
      back() {
        this._locationStrategy.back();
      }
      historyGo(t = 0) {
        this._locationStrategy.historyGo?.(t);
      }
      onUrlChange(t) {
        return (
          this._urlChangeListeners.push(t),
          (this._urlChangeSubscription ??= this.subscribe((r) => {
            this._notifyUrlChangeListeners(r.url, r.state);
          })),
          () => {
            let r = this._urlChangeListeners.indexOf(t);
            this._urlChangeListeners.splice(r, 1),
              this._urlChangeListeners.length === 0 &&
                (this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeSubscription = null));
          }
        );
      }
      _notifyUrlChangeListeners(t = "", r) {
        this._urlChangeListeners.forEach((i) => i(t, r));
      }
      subscribe(t, r, i) {
        return this._subject.subscribe({
          next: t,
          error: r ?? void 0,
          complete: i ?? void 0,
        });
      }
      static normalizeQueryParams = nn;
      static joinWithSlash = _d;
      static stripTrailingSlash = ay;
      static ɵfac = function (r) {
        return new (r || e)(M(on));
      };
      static ɵprov = b({ token: e, factory: () => sI(), providedIn: "root" });
    }
    return e;
  })();
function sI() {
  return new Jr(M(on));
}
function aI(e, n) {
  if (!e || !n.startsWith(e)) return n;
  let t = n.substring(e.length);
  return t === "" || ["/", ";", "?", "#"].includes(t[0]) ? t : n;
}
function ly(e) {
  return e.replace(/\/index.html$/, "");
}
function lI(e) {
  if (new RegExp("^(https?:)?//").test(e)) {
    let [, t] = e.split(/\/\/[^\/]+/);
    return t;
  }
  return e;
}
var vy = {
    ADP: [void 0, void 0, 0],
    AFN: [void 0, "\u060B", 0],
    ALL: [void 0, void 0, 0],
    AMD: [void 0, "\u058F", 2],
    AOA: [void 0, "Kz"],
    ARS: [void 0, "$"],
    AUD: ["A$", "$"],
    AZN: [void 0, "\u20BC"],
    BAM: [void 0, "KM"],
    BBD: [void 0, "$"],
    BDT: [void 0, "\u09F3"],
    BHD: [void 0, void 0, 3],
    BIF: [void 0, void 0, 0],
    BMD: [void 0, "$"],
    BND: [void 0, "$"],
    BOB: [void 0, "Bs"],
    BRL: ["R$"],
    BSD: [void 0, "$"],
    BWP: [void 0, "P"],
    BYN: [void 0, void 0, 2],
    BYR: [void 0, void 0, 0],
    BZD: [void 0, "$"],
    CAD: ["CA$", "$", 2],
    CHF: [void 0, void 0, 2],
    CLF: [void 0, void 0, 4],
    CLP: [void 0, "$", 0],
    CNY: ["CN\xA5", "\xA5"],
    COP: [void 0, "$", 2],
    CRC: [void 0, "\u20A1", 2],
    CUC: [void 0, "$"],
    CUP: [void 0, "$"],
    CZK: [void 0, "K\u010D", 2],
    DJF: [void 0, void 0, 0],
    DKK: [void 0, "kr", 2],
    DOP: [void 0, "$"],
    EGP: [void 0, "E\xA3"],
    ESP: [void 0, "\u20A7", 0],
    EUR: ["\u20AC"],
    FJD: [void 0, "$"],
    FKP: [void 0, "\xA3"],
    GBP: ["\xA3"],
    GEL: [void 0, "\u20BE"],
    GHS: [void 0, "GH\u20B5"],
    GIP: [void 0, "\xA3"],
    GNF: [void 0, "FG", 0],
    GTQ: [void 0, "Q"],
    GYD: [void 0, "$", 2],
    HKD: ["HK$", "$"],
    HNL: [void 0, "L"],
    HRK: [void 0, "kn"],
    HUF: [void 0, "Ft", 2],
    IDR: [void 0, "Rp", 2],
    ILS: ["\u20AA"],
    INR: ["\u20B9"],
    IQD: [void 0, void 0, 0],
    IRR: [void 0, void 0, 0],
    ISK: [void 0, "kr", 0],
    ITL: [void 0, void 0, 0],
    JMD: [void 0, "$"],
    JOD: [void 0, void 0, 3],
    JPY: ["\xA5", void 0, 0],
    KHR: [void 0, "\u17DB"],
    KMF: [void 0, "CF", 0],
    KPW: [void 0, "\u20A9", 0],
    KRW: ["\u20A9", void 0, 0],
    KWD: [void 0, void 0, 3],
    KYD: [void 0, "$"],
    KZT: [void 0, "\u20B8"],
    LAK: [void 0, "\u20AD", 0],
    LBP: [void 0, "L\xA3", 0],
    LKR: [void 0, "Rs"],
    LRD: [void 0, "$"],
    LTL: [void 0, "Lt"],
    LUF: [void 0, void 0, 0],
    LVL: [void 0, "Ls"],
    LYD: [void 0, void 0, 3],
    MGA: [void 0, "Ar", 0],
    MGF: [void 0, void 0, 0],
    MMK: [void 0, "K", 0],
    MNT: [void 0, "\u20AE", 2],
    MRO: [void 0, void 0, 0],
    MUR: [void 0, "Rs", 2],
    MXN: ["MX$", "$"],
    MYR: [void 0, "RM"],
    NAD: [void 0, "$"],
    NGN: [void 0, "\u20A6"],
    NIO: [void 0, "C$"],
    NOK: [void 0, "kr", 2],
    NPR: [void 0, "Rs"],
    NZD: ["NZ$", "$"],
    OMR: [void 0, void 0, 3],
    PHP: ["\u20B1"],
    PKR: [void 0, "Rs", 2],
    PLN: [void 0, "z\u0142"],
    PYG: [void 0, "\u20B2", 0],
    RON: [void 0, "lei"],
    RSD: [void 0, void 0, 0],
    RUB: [void 0, "\u20BD"],
    RWF: [void 0, "RF", 0],
    SBD: [void 0, "$"],
    SEK: [void 0, "kr", 2],
    SGD: [void 0, "$"],
    SHP: [void 0, "\xA3"],
    SLE: [void 0, void 0, 2],
    SLL: [void 0, void 0, 0],
    SOS: [void 0, void 0, 0],
    SRD: [void 0, "$"],
    SSP: [void 0, "\xA3"],
    STD: [void 0, void 0, 0],
    STN: [void 0, "Db"],
    SYP: [void 0, "\xA3", 0],
    THB: [void 0, "\u0E3F"],
    TMM: [void 0, void 0, 0],
    TND: [void 0, void 0, 3],
    TOP: [void 0, "T$"],
    TRL: [void 0, void 0, 0],
    TRY: [void 0, "\u20BA"],
    TTD: [void 0, "$"],
    TWD: ["NT$", "$", 2],
    TZS: [void 0, void 0, 2],
    UAH: [void 0, "\u20B4"],
    UGX: [void 0, void 0, 0],
    USD: ["$"],
    UYI: [void 0, void 0, 0],
    UYU: [void 0, "$"],
    UYW: [void 0, void 0, 4],
    UZS: [void 0, void 0, 2],
    VEF: [void 0, "Bs", 2],
    VND: ["\u20AB", void 0, 0],
    VUV: [void 0, void 0, 0],
    XAF: ["FCFA", void 0, 0],
    XCD: ["EC$", "$"],
    XOF: ["F\u202FCFA", void 0, 0],
    XPF: ["CFPF", void 0, 0],
    XXX: ["\xA4"],
    YER: [void 0, void 0, 0],
    ZAR: [void 0, "R"],
    ZMK: [void 0, void 0, 0],
    ZMW: [void 0, "ZK"],
    ZWD: [void 0, void 0, 0],
  },
  Dy = (function (e) {
    return (
      (e[(e.Decimal = 0)] = "Decimal"),
      (e[(e.Percent = 1)] = "Percent"),
      (e[(e.Currency = 2)] = "Currency"),
      (e[(e.Scientific = 3)] = "Scientific"),
      e
    );
  })(Dy || {});
var rn = {
  Decimal: 0,
  Group: 1,
  List: 2,
  PercentSign: 3,
  PlusSign: 4,
  MinusSign: 5,
  Exponential: 6,
  SuperscriptingExponent: 7,
  PerMille: 8,
  Infinity: 9,
  NaN: 10,
  TimeSeparator: 11,
  CurrencyDecimal: 12,
  CurrencyGroup: 13,
};
function zi(e, n) {
  let t = Na(e),
    r = t[rr.NumberSymbols][n];
  if (typeof r > "u") {
    if (n === rn.CurrencyDecimal) return t[rr.NumberSymbols][rn.Decimal];
    if (n === rn.CurrencyGroup) return t[rr.NumberSymbols][rn.Group];
  }
  return r;
}
function cI(e, n) {
  return Na(e)[rr.NumberFormats][n];
}
function uI(e) {
  return Na(e)[rr.Currencies];
}
function dI(e, n, t = "en") {
  let r = uI(t)[e] || vy[e] || [],
    i = r[1];
  return n === "narrow" && typeof i == "string" ? i : r[0] || e;
}
var fI = 2;
function hI(e) {
  let n,
    t = vy[e];
  return t && (n = t[2]), typeof n == "number" ? n : fI;
}
var pI = /^(\d+)?\.((\d+)(-(\d+))?)?$/,
  cy = 22,
  ka = ".",
  Gi = "0",
  gI = ";",
  mI = ",",
  fd = "#",
  uy = "\xA4";
function yI(e, n, t, r, i, o, s = !1) {
  let a = "",
    l = !1;
  if (!isFinite(e)) a = zi(t, rn.Infinity);
  else {
    let c = EI(e);
    s && (c = _I(c));
    let u = n.minInt,
      d = n.minFrac,
      h = n.maxFrac;
    if (o) {
      let O = o.match(pI);
      if (O === null) throw new Error(`${o} is not a valid digit info`);
      let x = O[1],
        U = O[3],
        le = O[5];
      x != null && (u = hd(x)),
        U != null && (d = hd(U)),
        le != null ? (h = hd(le)) : U != null && d > h && (h = d);
    }
    wI(c, d, h);
    let f = c.digits,
      m = c.integerLen,
      y = c.exponent,
      E = [];
    for (l = f.every((O) => !O); m < u; m++) f.unshift(0);
    for (; m < 0; m++) f.unshift(0);
    m > 0 ? (E = f.splice(m, f.length)) : ((E = f), (f = [0]));
    let S = [];
    for (
      f.length >= n.lgSize && S.unshift(f.splice(-n.lgSize, f.length).join(""));
      f.length > n.gSize;

    )
      S.unshift(f.splice(-n.gSize, f.length).join(""));
    f.length && S.unshift(f.join("")),
      (a = S.join(zi(t, r))),
      E.length && (a += zi(t, i) + E.join("")),
      y && (a += zi(t, rn.Exponential) + "+" + y);
  }
  return (
    e < 0 && !l ? (a = n.negPre + a + n.negSuf) : (a = n.posPre + a + n.posSuf),
    a
  );
}
function vI(e, n, t, r, i) {
  let o = cI(n, Dy.Currency),
    s = DI(o, zi(n, rn.MinusSign));
  return (
    (s.minFrac = hI(r)),
    (s.maxFrac = s.minFrac),
    yI(e, s, n, rn.CurrencyGroup, rn.CurrencyDecimal, i)
      .replace(uy, t)
      .replace(uy, "")
      .trim()
  );
}
function DI(e, n = "-") {
  let t = {
      minInt: 1,
      minFrac: 0,
      maxFrac: 0,
      posPre: "",
      posSuf: "",
      negPre: "",
      negSuf: "",
      gSize: 0,
      lgSize: 0,
    },
    r = e.split(gI),
    i = r[0],
    o = r[1],
    s =
      i.indexOf(ka) !== -1
        ? i.split(ka)
        : [
            i.substring(0, i.lastIndexOf(Gi) + 1),
            i.substring(i.lastIndexOf(Gi) + 1),
          ],
    a = s[0],
    l = s[1] || "";
  t.posPre = a.substring(0, a.indexOf(fd));
  for (let u = 0; u < l.length; u++) {
    let d = l.charAt(u);
    d === Gi
      ? (t.minFrac = t.maxFrac = u + 1)
      : d === fd
      ? (t.maxFrac = u + 1)
      : (t.posSuf += d);
  }
  let c = a.split(mI);
  if (
    ((t.gSize = c[1] ? c[1].length : 0),
    (t.lgSize = c[2] || c[1] ? (c[2] || c[1]).length : 0),
    o)
  ) {
    let u = i.length - t.posPre.length - t.posSuf.length,
      d = o.indexOf(fd);
    (t.negPre = o.substring(0, d).replace(/'/g, "")),
      (t.negSuf = o.slice(d + u).replace(/'/g, ""));
  } else (t.negPre = n + t.posPre), (t.negSuf = t.posSuf);
  return t;
}
function _I(e) {
  if (e.digits[0] === 0) return e;
  let n = e.digits.length - e.integerLen;
  return (
    e.exponent
      ? (e.exponent += 2)
      : (n === 0 ? e.digits.push(0, 0) : n === 1 && e.digits.push(0),
        (e.integerLen += 2)),
    e
  );
}
function EI(e) {
  let n = Math.abs(e) + "",
    t = 0,
    r,
    i,
    o,
    s,
    a;
  for (
    (i = n.indexOf(ka)) > -1 && (n = n.replace(ka, "")),
      (o = n.search(/e/i)) > 0
        ? (i < 0 && (i = o), (i += +n.slice(o + 1)), (n = n.substring(0, o)))
        : i < 0 && (i = n.length),
      o = 0;
    n.charAt(o) === Gi;
    o++
  );
  if (o === (a = n.length)) (r = [0]), (i = 1);
  else {
    for (a--; n.charAt(a) === Gi; ) a--;
    for (i -= o, r = [], s = 0; o <= a; o++, s++) r[s] = Number(n.charAt(o));
  }
  return (
    i > cy && ((r = r.splice(0, cy - 1)), (t = i - 1), (i = 1)),
    { digits: r, exponent: t, integerLen: i }
  );
}
function wI(e, n, t) {
  if (n > t)
    throw new Error(
      `The minimum number of digits after fraction (${n}) is higher than the maximum (${t}).`
    );
  let r = e.digits,
    i = r.length - e.integerLen,
    o = Math.min(Math.max(n, i), t),
    s = o + e.integerLen,
    a = r[s];
  if (s > 0) {
    r.splice(Math.max(e.integerLen, s));
    for (let d = s; d < r.length; d++) r[d] = 0;
  } else {
    (i = Math.max(0, i)),
      (e.integerLen = 1),
      (r.length = Math.max(1, (s = o + 1))),
      (r[0] = 0);
    for (let d = 1; d < s; d++) r[d] = 0;
  }
  if (a >= 5)
    if (s - 1 < 0) {
      for (let d = 0; d > s; d--) r.unshift(0), e.integerLen++;
      r.unshift(1), e.integerLen++;
    } else r[s - 1]++;
  for (; i < Math.max(0, o); i++) r.push(0);
  let l = o !== 0,
    c = n + e.integerLen,
    u = r.reduceRight(function (d, h, f, m) {
      return (
        (h = h + d),
        (m[f] = h < 10 ? h : h - 10),
        l && (m[f] === 0 && f >= c ? m.pop() : (l = !1)),
        h >= 10 ? 1 : 0
      );
    }, 0);
  u && (r.unshift(u), e.integerLen++);
}
function hd(e) {
  let n = parseInt(e);
  if (isNaN(n)) throw new Error("Invalid integer literal when parsing " + e);
  return n;
}
function La(e, n) {
  n = encodeURIComponent(n);
  for (let t of e.split(";")) {
    let r = t.indexOf("="),
      [i, o] = r == -1 ? [t, ""] : [t.slice(0, r), t.slice(r + 1)];
    if (i.trim() === n) return decodeURIComponent(o);
  }
  return null;
}
var pd = class {
    $implicit;
    ngForOf;
    index;
    count;
    constructor(n, t, r, i) {
      (this.$implicit = n),
        (this.ngForOf = t),
        (this.index = r),
        (this.count = i);
    }
    get first() {
      return this.index === 0;
    }
    get last() {
      return this.index === this.count - 1;
    }
    get even() {
      return this.index % 2 === 0;
    }
    get odd() {
      return !this.even;
    }
  },
  An = (() => {
    class e {
      _viewContainer;
      _template;
      _differs;
      set ngForOf(t) {
        (this._ngForOf = t), (this._ngForOfDirty = !0);
      }
      set ngForTrackBy(t) {
        this._trackByFn = t;
      }
      get ngForTrackBy() {
        return this._trackByFn;
      }
      _ngForOf = null;
      _ngForOfDirty = !0;
      _differ = null;
      _trackByFn;
      constructor(t, r, i) {
        (this._viewContainer = t), (this._template = r), (this._differs = i);
      }
      set ngForTemplate(t) {
        t && (this._template = t);
      }
      ngDoCheck() {
        if (this._ngForOfDirty) {
          this._ngForOfDirty = !1;
          let t = this._ngForOf;
          if (!this._differ && t)
            if (0)
              try {
              } catch {}
            else this._differ = this._differs.find(t).create(this.ngForTrackBy);
        }
        if (this._differ) {
          let t = this._differ.diff(this._ngForOf);
          t && this._applyChanges(t);
        }
      }
      _applyChanges(t) {
        let r = this._viewContainer;
        t.forEachOperation((i, o, s) => {
          if (i.previousIndex == null)
            r.createEmbeddedView(
              this._template,
              new pd(i.item, this._ngForOf, -1, -1),
              s === null ? void 0 : s
            );
          else if (s == null) r.remove(o === null ? void 0 : o);
          else if (o !== null) {
            let a = r.get(o);
            r.move(a, s), dy(a, i);
          }
        });
        for (let i = 0, o = r.length; i < o; i++) {
          let a = r.get(i).context;
          (a.index = i), (a.count = o), (a.ngForOf = this._ngForOf);
        }
        t.forEachIdentityChange((i) => {
          let o = r.get(i.currentIndex);
          dy(o, i);
        });
      }
      static ngTemplateContextGuard(t, r) {
        return !0;
      }
      static ɵfac = function (r) {
        return new (r || e)(C(Gr), C(Ea), C(ud));
      };
      static ɵdir = de({
        type: e,
        selectors: [["", "ngFor", "", "ngForOf", ""]],
        inputs: {
          ngForOf: "ngForOf",
          ngForTrackBy: "ngForTrackBy",
          ngForTemplate: "ngForTemplate",
        },
      });
    }
    return e;
  })();
function dy(e, n) {
  e.context.$implicit = n.item;
}
var Xr = (() => {
    class e {
      _viewContainer;
      _context = new gd();
      _thenTemplateRef = null;
      _elseTemplateRef = null;
      _thenViewRef = null;
      _elseViewRef = null;
      constructor(t, r) {
        (this._viewContainer = t), (this._thenTemplateRef = r);
      }
      set ngIf(t) {
        (this._context.$implicit = this._context.ngIf = t), this._updateView();
      }
      set ngIfThen(t) {
        fy("ngIfThen", t),
          (this._thenTemplateRef = t),
          (this._thenViewRef = null),
          this._updateView();
      }
      set ngIfElse(t) {
        fy("ngIfElse", t),
          (this._elseTemplateRef = t),
          (this._elseViewRef = null),
          this._updateView();
      }
      _updateView() {
        this._context.$implicit
          ? this._thenViewRef ||
            (this._viewContainer.clear(),
            (this._elseViewRef = null),
            this._thenTemplateRef &&
              (this._thenViewRef = this._viewContainer.createEmbeddedView(
                this._thenTemplateRef,
                this._context
              )))
          : this._elseViewRef ||
            (this._viewContainer.clear(),
            (this._thenViewRef = null),
            this._elseTemplateRef &&
              (this._elseViewRef = this._viewContainer.createEmbeddedView(
                this._elseTemplateRef,
                this._context
              )));
      }
      static ngIfUseIfTypeGuard;
      static ngTemplateGuard_ngIf;
      static ngTemplateContextGuard(t, r) {
        return !0;
      }
      static ɵfac = function (r) {
        return new (r || e)(C(Gr), C(Ea));
      };
      static ɵdir = de({
        type: e,
        selectors: [["", "ngIf", ""]],
        inputs: { ngIf: "ngIf", ngIfThen: "ngIfThen", ngIfElse: "ngIfElse" },
      });
    }
    return e;
  })(),
  gd = class {
    $implicit = null;
    ngIf = null;
  };
function fy(e, n) {
  if (!!!(!n || n.createEmbeddedView))
    throw new Error(`${e} must be a TemplateRef, but received '${Pe(n)}'.`);
}
var _y = (() => {
  class e {
    _ngEl;
    _differs;
    _renderer;
    _ngStyle = null;
    _differ = null;
    constructor(t, r, i) {
      (this._ngEl = t), (this._differs = r), (this._renderer = i);
    }
    set ngStyle(t) {
      (this._ngStyle = t),
        !this._differ && t && (this._differ = this._differs.find(t).create());
    }
    ngDoCheck() {
      if (this._differ) {
        let t = this._differ.diff(this._ngStyle);
        t && this._applyChanges(t);
      }
    }
    _setStyle(t, r) {
      let [i, o] = t.split("."),
        s = i.indexOf("-") === -1 ? void 0 : Pt.DashCase;
      r != null
        ? this._renderer.setStyle(
            this._ngEl.nativeElement,
            i,
            o ? `${r}${o}` : r,
            s
          )
        : this._renderer.removeStyle(this._ngEl.nativeElement, i, s);
    }
    _applyChanges(t) {
      t.forEachRemovedItem((r) => this._setStyle(r.key, null)),
        t.forEachAddedItem((r) => this._setStyle(r.key, r.currentValue)),
        t.forEachChangedItem((r) => this._setStyle(r.key, r.currentValue));
    }
    static ɵfac = function (r) {
      return new (r || e)(C(Dt), C(dd), C(Ft));
    };
    static ɵdir = de({
      type: e,
      selectors: [["", "ngStyle", ""]],
      inputs: { ngStyle: "ngStyle" },
    });
  }
  return e;
})();
function CI(e, n) {
  return new D(2100, !1);
}
var Va = (() => {
  class e {
    _locale;
    _defaultCurrencyCode;
    constructor(t, r = "USD") {
      (this._locale = t), (this._defaultCurrencyCode = r);
    }
    transform(t, r = this._defaultCurrencyCode, i = "symbol", o, s) {
      if (!bI(t)) return null;
      (s ||= this._locale),
        typeof i == "boolean" && (i = i ? "symbol" : "code");
      let a = r || this._defaultCurrencyCode;
      i !== "code" &&
        (i === "symbol" || i === "symbol-narrow"
          ? (a = dI(a, i === "symbol" ? "wide" : "narrow", s))
          : (a = i));
      try {
        let l = II(t);
        return vI(l, s, a, r, o);
      } catch (l) {
        throw CI(e, l.message);
      }
    }
    static ɵfac = function (r) {
      return new (r || e)(C(Oa, 16), C(ey, 16));
    };
    static ɵpipe = jm({ name: "currency", type: e, pure: !0 });
  }
  return e;
})();
function bI(e) {
  return !(e == null || e === "" || e !== e);
}
function II(e) {
  if (typeof e == "string" && !isNaN(Number(e) - parseFloat(e)))
    return Number(e);
  if (typeof e != "number") throw new Error(`${e} is not a number`);
  return e;
}
var Ey = (() => {
    class e {
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵmod = Se({ type: e });
      static ɵinj = Ie({});
    }
    return e;
  })(),
  wd = "browser",
  SI = "server";
function MI(e) {
  return e === wd;
}
function ja(e) {
  return e === SI;
}
var wy = (() => {
    class e {
      static ɵprov = b({
        token: e,
        providedIn: "root",
        factory: () => (MI(v(Xt)) ? new md(v(Me), window) : new yd()),
      });
    }
    return e;
  })(),
  md = class {
    document;
    window;
    offset = () => [0, 0];
    constructor(n, t) {
      (this.document = n), (this.window = t);
    }
    setOffset(n) {
      Array.isArray(n) ? (this.offset = () => n) : (this.offset = n);
    }
    getScrollPosition() {
      return [this.window.scrollX, this.window.scrollY];
    }
    scrollToPosition(n) {
      this.window.scrollTo(n[0], n[1]);
    }
    scrollToAnchor(n) {
      let t = TI(this.document, n);
      t && (this.scrollToElement(t), t.focus());
    }
    setHistoryScrollRestoration(n) {
      this.window.history.scrollRestoration = n;
    }
    scrollToElement(n) {
      let t = n.getBoundingClientRect(),
        r = t.left + this.window.pageXOffset,
        i = t.top + this.window.pageYOffset,
        o = this.offset();
      this.window.scrollTo(r - o[0], i - o[1]);
    }
  };
function TI(e, n) {
  let t = e.getElementById(n) || e.getElementsByName(n)[0];
  if (t) return t;
  if (
    typeof e.createTreeWalker == "function" &&
    e.body &&
    typeof e.body.attachShadow == "function"
  ) {
    let r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT),
      i = r.currentNode;
    for (; i; ) {
      let o = i.shadowRoot;
      if (o) {
        let s = o.getElementById(n) || o.querySelector(`[name="${n}"]`);
        if (s) return s;
      }
      i = r.nextNode();
    }
  }
  return null;
}
var yd = class {
    setOffset(n) {}
    getScrollPosition() {
      return [0, 0];
    }
    scrollToPosition(n) {}
    scrollToAnchor(n) {}
    setHistoryScrollRestoration(n) {}
  },
  Yr = class {};
var Wi = class {},
  Ua = class {},
  an = class e {
    headers;
    normalizedNames = new Map();
    lazyInit;
    lazyUpdate = null;
    constructor(n) {
      n
        ? typeof n == "string"
          ? (this.lazyInit = () => {
              (this.headers = new Map()),
                n
                  .split(
                    `
`
                  )
                  .forEach((t) => {
                    let r = t.indexOf(":");
                    if (r > 0) {
                      let i = t.slice(0, r),
                        o = t.slice(r + 1).trim();
                      this.addHeaderEntry(i, o);
                    }
                  });
            })
          : typeof Headers < "u" && n instanceof Headers
          ? ((this.headers = new Map()),
            n.forEach((t, r) => {
              this.addHeaderEntry(r, t);
            }))
          : (this.lazyInit = () => {
              (this.headers = new Map()),
                Object.entries(n).forEach(([t, r]) => {
                  this.setHeaderEntries(t, r);
                });
            })
        : (this.headers = new Map());
    }
    has(n) {
      return this.init(), this.headers.has(n.toLowerCase());
    }
    get(n) {
      this.init();
      let t = this.headers.get(n.toLowerCase());
      return t && t.length > 0 ? t[0] : null;
    }
    keys() {
      return this.init(), Array.from(this.normalizedNames.values());
    }
    getAll(n) {
      return this.init(), this.headers.get(n.toLowerCase()) || null;
    }
    append(n, t) {
      return this.clone({ name: n, value: t, op: "a" });
    }
    set(n, t) {
      return this.clone({ name: n, value: t, op: "s" });
    }
    delete(n, t) {
      return this.clone({ name: n, value: t, op: "d" });
    }
    maybeSetNormalizedName(n, t) {
      this.normalizedNames.has(t) || this.normalizedNames.set(t, n);
    }
    init() {
      this.lazyInit &&
        (this.lazyInit instanceof e
          ? this.copyFrom(this.lazyInit)
          : this.lazyInit(),
        (this.lazyInit = null),
        this.lazyUpdate &&
          (this.lazyUpdate.forEach((n) => this.applyUpdate(n)),
          (this.lazyUpdate = null)));
    }
    copyFrom(n) {
      n.init(),
        Array.from(n.headers.keys()).forEach((t) => {
          this.headers.set(t, n.headers.get(t)),
            this.normalizedNames.set(t, n.normalizedNames.get(t));
        });
    }
    clone(n) {
      let t = new e();
      return (
        (t.lazyInit =
          this.lazyInit && this.lazyInit instanceof e ? this.lazyInit : this),
        (t.lazyUpdate = (this.lazyUpdate || []).concat([n])),
        t
      );
    }
    applyUpdate(n) {
      let t = n.name.toLowerCase();
      switch (n.op) {
        case "a":
        case "s":
          let r = n.value;
          if ((typeof r == "string" && (r = [r]), r.length === 0)) return;
          this.maybeSetNormalizedName(n.name, t);
          let i = (n.op === "a" ? this.headers.get(t) : void 0) || [];
          i.push(...r), this.headers.set(t, i);
          break;
        case "d":
          let o = n.value;
          if (!o) this.headers.delete(t), this.normalizedNames.delete(t);
          else {
            let s = this.headers.get(t);
            if (!s) return;
            (s = s.filter((a) => o.indexOf(a) === -1)),
              s.length === 0
                ? (this.headers.delete(t), this.normalizedNames.delete(t))
                : this.headers.set(t, s);
          }
          break;
      }
    }
    addHeaderEntry(n, t) {
      let r = n.toLowerCase();
      this.maybeSetNormalizedName(n, r),
        this.headers.has(r)
          ? this.headers.get(r).push(t)
          : this.headers.set(r, [t]);
    }
    setHeaderEntries(n, t) {
      let r = (Array.isArray(t) ? t : [t]).map((o) => o.toString()),
        i = n.toLowerCase();
      this.headers.set(i, r), this.maybeSetNormalizedName(n, i);
    }
    forEach(n) {
      this.init(),
        Array.from(this.normalizedNames.keys()).forEach((t) =>
          n(this.normalizedNames.get(t), this.headers.get(t))
        );
    }
  };
var bd = class {
  encodeKey(n) {
    return Cy(n);
  }
  encodeValue(n) {
    return Cy(n);
  }
  decodeKey(n) {
    return decodeURIComponent(n);
  }
  decodeValue(n) {
    return decodeURIComponent(n);
  }
};
function AI(e, n) {
  let t = new Map();
  return (
    e.length > 0 &&
      e
        .replace(/^\?/, "")
        .split("&")
        .forEach((i) => {
          let o = i.indexOf("="),
            [s, a] =
              o == -1
                ? [n.decodeKey(i), ""]
                : [n.decodeKey(i.slice(0, o)), n.decodeValue(i.slice(o + 1))],
            l = t.get(s) || [];
          l.push(a), t.set(s, l);
        }),
    t
  );
}
var NI = /%(\d[a-f0-9])/gi,
  xI = {
    40: "@",
    "3A": ":",
    24: "$",
    "2C": ",",
    "3B": ";",
    "3D": "=",
    "3F": "?",
    "2F": "/",
  };
function Cy(e) {
  return encodeURIComponent(e).replace(NI, (n, t) => xI[t] ?? n);
}
function Ba(e) {
  return `${e}`;
}
var xn = class e {
  map;
  encoder;
  updates = null;
  cloneFrom = null;
  constructor(n = {}) {
    if (((this.encoder = n.encoder || new bd()), n.fromString)) {
      if (n.fromObject)
        throw new Error("Cannot specify both fromString and fromObject.");
      this.map = AI(n.fromString, this.encoder);
    } else
      n.fromObject
        ? ((this.map = new Map()),
          Object.keys(n.fromObject).forEach((t) => {
            let r = n.fromObject[t],
              i = Array.isArray(r) ? r.map(Ba) : [Ba(r)];
            this.map.set(t, i);
          }))
        : (this.map = null);
  }
  has(n) {
    return this.init(), this.map.has(n);
  }
  get(n) {
    this.init();
    let t = this.map.get(n);
    return t ? t[0] : null;
  }
  getAll(n) {
    return this.init(), this.map.get(n) || null;
  }
  keys() {
    return this.init(), Array.from(this.map.keys());
  }
  append(n, t) {
    return this.clone({ param: n, value: t, op: "a" });
  }
  appendAll(n) {
    let t = [];
    return (
      Object.keys(n).forEach((r) => {
        let i = n[r];
        Array.isArray(i)
          ? i.forEach((o) => {
              t.push({ param: r, value: o, op: "a" });
            })
          : t.push({ param: r, value: i, op: "a" });
      }),
      this.clone(t)
    );
  }
  set(n, t) {
    return this.clone({ param: n, value: t, op: "s" });
  }
  delete(n, t) {
    return this.clone({ param: n, value: t, op: "d" });
  }
  toString() {
    return (
      this.init(),
      this.keys()
        .map((n) => {
          let t = this.encoder.encodeKey(n);
          return this.map
            .get(n)
            .map((r) => t + "=" + this.encoder.encodeValue(r))
            .join("&");
        })
        .filter((n) => n !== "")
        .join("&")
    );
  }
  clone(n) {
    let t = new e({ encoder: this.encoder });
    return (
      (t.cloneFrom = this.cloneFrom || this),
      (t.updates = (this.updates || []).concat(n)),
      t
    );
  }
  init() {
    this.map === null && (this.map = new Map()),
      this.cloneFrom !== null &&
        (this.cloneFrom.init(),
        this.cloneFrom
          .keys()
          .forEach((n) => this.map.set(n, this.cloneFrom.map.get(n))),
        this.updates.forEach((n) => {
          switch (n.op) {
            case "a":
            case "s":
              let t = (n.op === "a" ? this.map.get(n.param) : void 0) || [];
              t.push(Ba(n.value)), this.map.set(n.param, t);
              break;
            case "d":
              if (n.value !== void 0) {
                let r = this.map.get(n.param) || [],
                  i = r.indexOf(Ba(n.value));
                i !== -1 && r.splice(i, 1),
                  r.length > 0
                    ? this.map.set(n.param, r)
                    : this.map.delete(n.param);
              } else {
                this.map.delete(n.param);
                break;
              }
          }
        }),
        (this.cloneFrom = this.updates = null));
  }
};
var Id = class {
  map = new Map();
  set(n, t) {
    return this.map.set(n, t), this;
  }
  get(n) {
    return (
      this.map.has(n) || this.map.set(n, n.defaultValue()), this.map.get(n)
    );
  }
  delete(n) {
    return this.map.delete(n), this;
  }
  has(n) {
    return this.map.has(n);
  }
  keys() {
    return this.map.keys();
  }
};
function RI(e) {
  switch (e) {
    case "DELETE":
    case "GET":
    case "HEAD":
    case "OPTIONS":
    case "JSONP":
      return !1;
    default:
      return !0;
  }
}
function by(e) {
  return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer;
}
function Iy(e) {
  return typeof Blob < "u" && e instanceof Blob;
}
function Sy(e) {
  return typeof FormData < "u" && e instanceof FormData;
}
function PI(e) {
  return typeof URLSearchParams < "u" && e instanceof URLSearchParams;
}
var qi = class e {
    url;
    body = null;
    headers;
    context;
    reportProgress = !1;
    withCredentials = !1;
    responseType = "json";
    method;
    params;
    urlWithParams;
    transferCache;
    constructor(n, t, r, i) {
      (this.url = t), (this.method = n.toUpperCase());
      let o;
      if (
        (RI(this.method) || i
          ? ((this.body = r !== void 0 ? r : null), (o = i))
          : (o = r),
        o &&
          ((this.reportProgress = !!o.reportProgress),
          (this.withCredentials = !!o.withCredentials),
          o.responseType && (this.responseType = o.responseType),
          o.headers && (this.headers = o.headers),
          o.context && (this.context = o.context),
          o.params && (this.params = o.params),
          (this.transferCache = o.transferCache)),
        (this.headers ??= new an()),
        (this.context ??= new Id()),
        !this.params)
      )
        (this.params = new xn()), (this.urlWithParams = t);
      else {
        let s = this.params.toString();
        if (s.length === 0) this.urlWithParams = t;
        else {
          let a = t.indexOf("?"),
            l = a === -1 ? "?" : a < t.length - 1 ? "&" : "";
          this.urlWithParams = t + l + s;
        }
      }
    }
    serializeBody() {
      return this.body === null
        ? null
        : typeof this.body == "string" ||
          by(this.body) ||
          Iy(this.body) ||
          Sy(this.body) ||
          PI(this.body)
        ? this.body
        : this.body instanceof xn
        ? this.body.toString()
        : typeof this.body == "object" ||
          typeof this.body == "boolean" ||
          Array.isArray(this.body)
        ? JSON.stringify(this.body)
        : this.body.toString();
    }
    detectContentTypeHeader() {
      return this.body === null || Sy(this.body)
        ? null
        : Iy(this.body)
        ? this.body.type || null
        : by(this.body)
        ? null
        : typeof this.body == "string"
        ? "text/plain"
        : this.body instanceof xn
        ? "application/x-www-form-urlencoded;charset=UTF-8"
        : typeof this.body == "object" ||
          typeof this.body == "number" ||
          typeof this.body == "boolean"
        ? "application/json"
        : null;
    }
    clone(n = {}) {
      let t = n.method || this.method,
        r = n.url || this.url,
        i = n.responseType || this.responseType,
        o = n.transferCache ?? this.transferCache,
        s = n.body !== void 0 ? n.body : this.body,
        a = n.withCredentials ?? this.withCredentials,
        l = n.reportProgress ?? this.reportProgress,
        c = n.headers || this.headers,
        u = n.params || this.params,
        d = n.context ?? this.context;
      return (
        n.setHeaders !== void 0 &&
          (c = Object.keys(n.setHeaders).reduce(
            (h, f) => h.set(f, n.setHeaders[f]),
            c
          )),
        n.setParams &&
          (u = Object.keys(n.setParams).reduce(
            (h, f) => h.set(f, n.setParams[f]),
            u
          )),
        new e(t, r, s, {
          params: u,
          headers: c,
          context: d,
          reportProgress: l,
          responseType: i,
          withCredentials: a,
          transferCache: o,
        })
      );
    }
  },
  Rn = (function (e) {
    return (
      (e[(e.Sent = 0)] = "Sent"),
      (e[(e.UploadProgress = 1)] = "UploadProgress"),
      (e[(e.ResponseHeader = 2)] = "ResponseHeader"),
      (e[(e.DownloadProgress = 3)] = "DownloadProgress"),
      (e[(e.Response = 4)] = "Response"),
      (e[(e.User = 5)] = "User"),
      e
    );
  })(Rn || {}),
  Qi = class {
    headers;
    status;
    statusText;
    url;
    ok;
    type;
    constructor(n, t = 200, r = "OK") {
      (this.headers = n.headers || new an()),
        (this.status = n.status !== void 0 ? n.status : t),
        (this.statusText = n.statusText || r),
        (this.url = n.url || null),
        (this.ok = this.status >= 200 && this.status < 300);
    }
  },
  $a = class e extends Qi {
    constructor(n = {}) {
      super(n);
    }
    type = Rn.ResponseHeader;
    clone(n = {}) {
      return new e({
        headers: n.headers || this.headers,
        status: n.status !== void 0 ? n.status : this.status,
        statusText: n.statusText || this.statusText,
        url: n.url || this.url || void 0,
      });
    }
  },
  Zi = class e extends Qi {
    body;
    constructor(n = {}) {
      super(n), (this.body = n.body !== void 0 ? n.body : null);
    }
    type = Rn.Response;
    clone(n = {}) {
      return new e({
        body: n.body !== void 0 ? n.body : this.body,
        headers: n.headers || this.headers,
        status: n.status !== void 0 ? n.status : this.status,
        statusText: n.statusText || this.statusText,
        url: n.url || this.url || void 0,
      });
    }
  },
  Nn = class extends Qi {
    name = "HttpErrorResponse";
    message;
    error;
    ok = !1;
    constructor(n) {
      super(n, 0, "Unknown Error"),
        this.status >= 200 && this.status < 300
          ? (this.message = `Http failure during parsing for ${
              n.url || "(unknown url)"
            }`)
          : (this.message = `Http failure response for ${
              n.url || "(unknown url)"
            }: ${n.status} ${n.statusText}`),
        (this.error = n.error || null);
    }
  },
  xy = 200,
  OI = 204;
function Cd(e, n) {
  return {
    body: n,
    headers: e.headers,
    context: e.context,
    observe: e.observe,
    params: e.params,
    reportProgress: e.reportProgress,
    responseType: e.responseType,
    withCredentials: e.withCredentials,
    transferCache: e.transferCache,
  };
}
var Ki = (() => {
    class e {
      handler;
      constructor(t) {
        this.handler = t;
      }
      request(t, r, i = {}) {
        let o;
        if (t instanceof qi) o = t;
        else {
          let l;
          i.headers instanceof an ? (l = i.headers) : (l = new an(i.headers));
          let c;
          i.params &&
            (i.params instanceof xn
              ? (c = i.params)
              : (c = new xn({ fromObject: i.params }))),
            (o = new qi(t, r, i.body !== void 0 ? i.body : null, {
              headers: l,
              context: i.context,
              params: c,
              reportProgress: i.reportProgress,
              responseType: i.responseType || "json",
              withCredentials: i.withCredentials,
              transferCache: i.transferCache,
            }));
        }
        let s = P(o).pipe(Gt((l) => this.handler.handle(l)));
        if (t instanceof qi || i.observe === "events") return s;
        let a = s.pipe(je((l) => l instanceof Zi));
        switch (i.observe || "body") {
          case "body":
            switch (o.responseType) {
              case "arraybuffer":
                return a.pipe(
                  L((l) => {
                    if (l.body !== null && !(l.body instanceof ArrayBuffer))
                      throw new Error("Response is not an ArrayBuffer.");
                    return l.body;
                  })
                );
              case "blob":
                return a.pipe(
                  L((l) => {
                    if (l.body !== null && !(l.body instanceof Blob))
                      throw new Error("Response is not a Blob.");
                    return l.body;
                  })
                );
              case "text":
                return a.pipe(
                  L((l) => {
                    if (l.body !== null && typeof l.body != "string")
                      throw new Error("Response is not a string.");
                    return l.body;
                  })
                );
              case "json":
              default:
                return a.pipe(L((l) => l.body));
            }
          case "response":
            return a;
          default:
            throw new Error(
              `Unreachable: unhandled observe type ${i.observe}}`
            );
        }
      }
      delete(t, r = {}) {
        return this.request("DELETE", t, r);
      }
      get(t, r = {}) {
        return this.request("GET", t, r);
      }
      head(t, r = {}) {
        return this.request("HEAD", t, r);
      }
      jsonp(t, r) {
        return this.request("JSONP", t, {
          params: new xn().append(r, "JSONP_CALLBACK"),
          observe: "body",
          responseType: "json",
        });
      }
      options(t, r = {}) {
        return this.request("OPTIONS", t, r);
      }
      patch(t, r, i = {}) {
        return this.request("PATCH", t, Cd(i, r));
      }
      post(t, r, i = {}) {
        return this.request("POST", t, Cd(i, r));
      }
      put(t, r, i = {}) {
        return this.request("PUT", t, Cd(i, r));
      }
      static ɵfac = function (r) {
        return new (r || e)(M(Wi));
      };
      static ɵprov = b({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  FI = /^\)\]\}',?\n/,
  kI = "X-Request-URL";
function My(e) {
  if (e.url) return e.url;
  let n = kI.toLocaleLowerCase();
  return e.headers.get(n);
}
var LI = (() => {
    class e {
      fetchImpl =
        v(Sd, { optional: !0 })?.fetch ?? ((...t) => globalThis.fetch(...t));
      ngZone = v(ee);
      handle(t) {
        return new Q((r) => {
          let i = new AbortController();
          return (
            this.doRequest(t, i.signal, r).then(Md, (o) =>
              r.error(new Nn({ error: o }))
            ),
            () => i.abort()
          );
        });
      }
      doRequest(t, r, i) {
        return Di(this, null, function* () {
          let o = this.createRequestInit(t),
            s;
          try {
            let f = this.ngZone.runOutsideAngular(() =>
              this.fetchImpl(t.urlWithParams, w({ signal: r }, o))
            );
            VI(f), i.next({ type: Rn.Sent }), (s = yield f);
          } catch (f) {
            i.error(
              new Nn({
                error: f,
                status: f.status ?? 0,
                statusText: f.statusText,
                url: t.urlWithParams,
                headers: f.headers,
              })
            );
            return;
          }
          let a = new an(s.headers),
            l = s.statusText,
            c = My(s) ?? t.urlWithParams,
            u = s.status,
            d = null;
          if (
            (t.reportProgress &&
              i.next(new $a({ headers: a, status: u, statusText: l, url: c })),
            s.body)
          ) {
            let f = s.headers.get("content-length"),
              m = [],
              y = s.body.getReader(),
              E = 0,
              S,
              O,
              x = typeof Zone < "u" && Zone.current;
            yield this.ngZone.runOutsideAngular(() =>
              Di(this, null, function* () {
                for (;;) {
                  let { done: le, value: X } = yield y.read();
                  if (le) break;
                  if ((m.push(X), (E += X.length), t.reportProgress)) {
                    O =
                      t.responseType === "text"
                        ? (O ?? "") +
                          (S ??= new TextDecoder()).decode(X, { stream: !0 })
                        : void 0;
                    let se = () =>
                      i.next({
                        type: Rn.DownloadProgress,
                        total: f ? +f : void 0,
                        loaded: E,
                        partialText: O,
                      });
                    x ? x.run(se) : se();
                  }
                }
              })
            );
            let U = this.concatChunks(m, E);
            try {
              let le = s.headers.get("Content-Type") ?? "";
              d = this.parseBody(t, U, le);
            } catch (le) {
              i.error(
                new Nn({
                  error: le,
                  headers: new an(s.headers),
                  status: s.status,
                  statusText: s.statusText,
                  url: My(s) ?? t.urlWithParams,
                })
              );
              return;
            }
          }
          u === 0 && (u = d ? xy : 0),
            u >= 200 && u < 300
              ? (i.next(
                  new Zi({
                    body: d,
                    headers: a,
                    status: u,
                    statusText: l,
                    url: c,
                  })
                ),
                i.complete())
              : i.error(
                  new Nn({
                    error: d,
                    headers: a,
                    status: u,
                    statusText: l,
                    url: c,
                  })
                );
        });
      }
      parseBody(t, r, i) {
        switch (t.responseType) {
          case "json":
            let o = new TextDecoder().decode(r).replace(FI, "");
            return o === "" ? null : JSON.parse(o);
          case "text":
            return new TextDecoder().decode(r);
          case "blob":
            return new Blob([r], { type: i });
          case "arraybuffer":
            return r.buffer;
        }
      }
      createRequestInit(t) {
        let r = {},
          i = t.withCredentials ? "include" : void 0;
        if (
          (t.headers.forEach((o, s) => (r[o] = s.join(","))),
          t.headers.has("Accept") ||
            (r.Accept = "application/json, text/plain, */*"),
          !t.headers.has("Content-Type"))
        ) {
          let o = t.detectContentTypeHeader();
          o !== null && (r["Content-Type"] = o);
        }
        return {
          body: t.serializeBody(),
          method: t.method,
          headers: r,
          credentials: i,
        };
      }
      concatChunks(t, r) {
        let i = new Uint8Array(r),
          o = 0;
        for (let s of t) i.set(s, o), (o += s.length);
        return i;
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = b({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  Sd = class {};
function Md() {}
function VI(e) {
  e.then(Md, Md);
}
function Ry(e, n) {
  return n(e);
}
function jI(e, n) {
  return (t, r) => n.intercept(t, { handle: (i) => e(i, r) });
}
function BI(e, n, t) {
  return (r, i) => $e(t, () => n(r, (o) => e(o, i)));
}
var UI = new I(""),
  Td = new I(""),
  $I = new I(""),
  Py = new I("", { providedIn: "root", factory: () => !0 });
function HI() {
  let e = null;
  return (n, t) => {
    e === null && (e = (v(UI, { optional: !0 }) ?? []).reduceRight(jI, Ry));
    let r = v(Jt);
    if (v(Py)) {
      let o = r.add();
      return e(n, t).pipe(mn(() => r.remove(o)));
    } else return e(n, t);
  };
}
var Ty = (() => {
  class e extends Wi {
    backend;
    injector;
    chain = null;
    pendingTasks = v(Jt);
    contributeToStability = v(Py);
    constructor(t, r) {
      super(), (this.backend = t), (this.injector = r);
    }
    handle(t) {
      if (this.chain === null) {
        let r = Array.from(
          new Set([...this.injector.get(Td), ...this.injector.get($I, [])])
        );
        this.chain = r.reduceRight((i, o) => BI(i, o, this.injector), Ry);
      }
      if (this.contributeToStability) {
        let r = this.pendingTasks.add();
        return this.chain(t, (i) => this.backend.handle(i)).pipe(
          mn(() => this.pendingTasks.remove(r))
        );
      } else return this.chain(t, (r) => this.backend.handle(r));
    }
    static ɵfac = function (r) {
      return new (r || e)(M(Ua), M(Oe));
    };
    static ɵprov = b({ token: e, factory: e.ɵfac });
  }
  return e;
})();
var zI = /^\)\]\}',?\n/;
function GI(e) {
  return "responseURL" in e && e.responseURL
    ? e.responseURL
    : /^X-Request-URL:/m.test(e.getAllResponseHeaders())
    ? e.getResponseHeader("X-Request-URL")
    : null;
}
var Ay = (() => {
    class e {
      xhrFactory;
      constructor(t) {
        this.xhrFactory = t;
      }
      handle(t) {
        if (t.method === "JSONP") throw new D(-2800, !1);
        let r = this.xhrFactory;
        return (r.ɵloadImpl ? ae(r.ɵloadImpl()) : P(null)).pipe(
          Be(
            () =>
              new Q((o) => {
                let s = r.build();
                if (
                  (s.open(t.method, t.urlWithParams),
                  t.withCredentials && (s.withCredentials = !0),
                  t.headers.forEach((y, E) =>
                    s.setRequestHeader(y, E.join(","))
                  ),
                  t.headers.has("Accept") ||
                    s.setRequestHeader(
                      "Accept",
                      "application/json, text/plain, */*"
                    ),
                  !t.headers.has("Content-Type"))
                ) {
                  let y = t.detectContentTypeHeader();
                  y !== null && s.setRequestHeader("Content-Type", y);
                }
                if (t.responseType) {
                  let y = t.responseType.toLowerCase();
                  s.responseType = y !== "json" ? y : "text";
                }
                let a = t.serializeBody(),
                  l = null,
                  c = () => {
                    if (l !== null) return l;
                    let y = s.statusText || "OK",
                      E = new an(s.getAllResponseHeaders()),
                      S = GI(s) || t.url;
                    return (
                      (l = new $a({
                        headers: E,
                        status: s.status,
                        statusText: y,
                        url: S,
                      })),
                      l
                    );
                  },
                  u = () => {
                    let { headers: y, status: E, statusText: S, url: O } = c(),
                      x = null;
                    E !== OI &&
                      (x =
                        typeof s.response > "u" ? s.responseText : s.response),
                      E === 0 && (E = x ? xy : 0);
                    let U = E >= 200 && E < 300;
                    if (t.responseType === "json" && typeof x == "string") {
                      let le = x;
                      x = x.replace(zI, "");
                      try {
                        x = x !== "" ? JSON.parse(x) : null;
                      } catch (X) {
                        (x = le), U && ((U = !1), (x = { error: X, text: x }));
                      }
                    }
                    U
                      ? (o.next(
                          new Zi({
                            body: x,
                            headers: y,
                            status: E,
                            statusText: S,
                            url: O || void 0,
                          })
                        ),
                        o.complete())
                      : o.error(
                          new Nn({
                            error: x,
                            headers: y,
                            status: E,
                            statusText: S,
                            url: O || void 0,
                          })
                        );
                  },
                  d = (y) => {
                    let { url: E } = c(),
                      S = new Nn({
                        error: y,
                        status: s.status || 0,
                        statusText: s.statusText || "Unknown Error",
                        url: E || void 0,
                      });
                    o.error(S);
                  },
                  h = !1,
                  f = (y) => {
                    h || (o.next(c()), (h = !0));
                    let E = { type: Rn.DownloadProgress, loaded: y.loaded };
                    y.lengthComputable && (E.total = y.total),
                      t.responseType === "text" &&
                        s.responseText &&
                        (E.partialText = s.responseText),
                      o.next(E);
                  },
                  m = (y) => {
                    let E = { type: Rn.UploadProgress, loaded: y.loaded };
                    y.lengthComputable && (E.total = y.total), o.next(E);
                  };
                return (
                  s.addEventListener("load", u),
                  s.addEventListener("error", d),
                  s.addEventListener("timeout", d),
                  s.addEventListener("abort", d),
                  t.reportProgress &&
                    (s.addEventListener("progress", f),
                    a !== null &&
                      s.upload &&
                      s.upload.addEventListener("progress", m)),
                  s.send(a),
                  o.next({ type: Rn.Sent }),
                  () => {
                    s.removeEventListener("error", d),
                      s.removeEventListener("abort", d),
                      s.removeEventListener("load", u),
                      s.removeEventListener("timeout", d),
                      t.reportProgress &&
                        (s.removeEventListener("progress", f),
                        a !== null &&
                          s.upload &&
                          s.upload.removeEventListener("progress", m)),
                      s.readyState !== s.DONE && s.abort();
                  }
                );
              })
          )
        );
      }
      static ɵfac = function (r) {
        return new (r || e)(M(Yr));
      };
      static ɵprov = b({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  Oy = new I(""),
  qI = "XSRF-TOKEN",
  WI = new I("", { providedIn: "root", factory: () => qI }),
  QI = "X-XSRF-TOKEN",
  ZI = new I("", { providedIn: "root", factory: () => QI }),
  Ha = class {},
  KI = (() => {
    class e {
      doc;
      platform;
      cookieName;
      lastCookieString = "";
      lastToken = null;
      parseCount = 0;
      constructor(t, r, i) {
        (this.doc = t), (this.platform = r), (this.cookieName = i);
      }
      getToken() {
        if (this.platform === "server") return null;
        let t = this.doc.cookie || "";
        return (
          t !== this.lastCookieString &&
            (this.parseCount++,
            (this.lastToken = La(t, this.cookieName)),
            (this.lastCookieString = t)),
          this.lastToken
        );
      }
      static ɵfac = function (r) {
        return new (r || e)(M(Me), M(Xt), M(WI));
      };
      static ɵprov = b({ token: e, factory: e.ɵfac });
    }
    return e;
  })();
function YI(e, n) {
  let t = e.url.toLowerCase();
  if (
    !v(Oy) ||
    e.method === "GET" ||
    e.method === "HEAD" ||
    t.startsWith("http://") ||
    t.startsWith("https://")
  )
    return n(e);
  let r = v(Ha).getToken(),
    i = v(ZI);
  return (
    r != null &&
      !e.headers.has(i) &&
      (e = e.clone({ headers: e.headers.set(i, r) })),
    n(e)
  );
}
var Fy = (function (e) {
  return (
    (e[(e.Interceptors = 0)] = "Interceptors"),
    (e[(e.LegacyInterceptors = 1)] = "LegacyInterceptors"),
    (e[(e.CustomXsrfConfiguration = 2)] = "CustomXsrfConfiguration"),
    (e[(e.NoXsrfProtection = 3)] = "NoXsrfProtection"),
    (e[(e.JsonpSupport = 4)] = "JsonpSupport"),
    (e[(e.RequestsMadeViaParent = 5)] = "RequestsMadeViaParent"),
    (e[(e.Fetch = 6)] = "Fetch"),
    e
  );
})(Fy || {});
function JI(e, n) {
  return { ɵkind: e, ɵproviders: n };
}
function XI(...e) {
  let n = [
    Ki,
    Ay,
    Ty,
    { provide: Wi, useExisting: Ty },
    { provide: Ua, useFactory: () => v(LI, { optional: !0 }) ?? v(Ay) },
    { provide: Td, useValue: YI, multi: !0 },
    { provide: Oy, useValue: !0 },
    { provide: Ha, useClass: KI },
  ];
  for (let t of e) n.push(...t.ɵproviders);
  return oa(n);
}
var Ny = new I("");
function eS() {
  return JI(Fy.LegacyInterceptors, [
    { provide: Ny, useFactory: HI },
    { provide: Td, useExisting: Ny, multi: !0 },
  ]);
}
var ky = (() => {
  class e {
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵmod = Se({ type: e });
    static ɵinj = Ie({ providers: [XI(eS())] });
  }
  return e;
})();
var Nd = class extends Fa {
    supportsDOMEvents = !0;
  },
  xd = class e extends Nd {
    static makeCurrent() {
      py(new e());
    }
    onAndCancel(n, t, r) {
      return (
        n.addEventListener(t, r),
        () => {
          n.removeEventListener(t, r);
        }
      );
    }
    dispatchEvent(n, t) {
      n.dispatchEvent(t);
    }
    remove(n) {
      n.remove();
    }
    createElement(n, t) {
      return (t = t || this.getDefaultDocument()), t.createElement(n);
    }
    createHtmlDocument() {
      return document.implementation.createHTMLDocument("fakeTitle");
    }
    getDefaultDocument() {
      return document;
    }
    isElementNode(n) {
      return n.nodeType === Node.ELEMENT_NODE;
    }
    isShadowRoot(n) {
      return n instanceof DocumentFragment;
    }
    getGlobalEventTarget(n, t) {
      return t === "window"
        ? window
        : t === "document"
        ? n
        : t === "body"
        ? n.body
        : null;
    }
    getBaseHref(n) {
      let t = tS();
      return t == null ? null : nS(t);
    }
    resetBaseElement() {
      Yi = null;
    }
    getUserAgent() {
      return window.navigator.userAgent;
    }
    getCookie(n) {
      return La(document.cookie, n);
    }
  },
  Yi = null;
function tS() {
  return (
    (Yi = Yi || document.querySelector("base")),
    Yi ? Yi.getAttribute("href") : null
  );
}
function nS(e) {
  return new URL(e, document.baseURI).pathname;
}
var Rd = class {
    addToWindow(n) {
      (xe.getAngularTestability = (r, i = !0) => {
        let o = n.findTestabilityInTree(r, i);
        if (o == null) throw new D(5103, !1);
        return o;
      }),
        (xe.getAllAngularTestabilities = () => n.getAllTestabilities()),
        (xe.getAllAngularRootElements = () => n.getAllRootElements());
      let t = (r) => {
        let i = xe.getAllAngularTestabilities(),
          o = i.length,
          s = function () {
            o--, o == 0 && r();
          };
        i.forEach((a) => {
          a.whenStable(s);
        });
      };
      xe.frameworkStabilizers || (xe.frameworkStabilizers = []),
        xe.frameworkStabilizers.push(t);
    }
    findTestabilityInTree(n, t, r) {
      if (t == null) return null;
      let i = n.getTestability(t);
      return (
        i ??
        (r
          ? kt().isShadowRoot(t)
            ? this.findTestabilityInTree(n, t.host, !0)
            : this.findTestabilityInTree(n, t.parentElement, !0)
          : null)
      );
    }
  },
  rS = (() => {
    class e {
      build() {
        return new XMLHttpRequest();
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = b({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  Pd = new I(""),
  $y = (() => {
    class e {
      _zone;
      _plugins;
      _eventNameToPlugin = new Map();
      constructor(t, r) {
        (this._zone = r),
          t.forEach((i) => {
            i.manager = this;
          }),
          (this._plugins = t.slice().reverse());
      }
      addEventListener(t, r, i) {
        return this._findPluginFor(r).addEventListener(t, r, i);
      }
      getZone() {
        return this._zone;
      }
      _findPluginFor(t) {
        let r = this._eventNameToPlugin.get(t);
        if (r) return r;
        if (((r = this._plugins.find((o) => o.supports(t))), !r))
          throw new D(5101, !1);
        return this._eventNameToPlugin.set(t, r), r;
      }
      static ɵfac = function (r) {
        return new (r || e)(M(Pd), M(ee));
      };
      static ɵprov = b({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  za = class {
    _doc;
    constructor(n) {
      this._doc = n;
    }
    manager;
  },
  Od = "ng-app-id";
function Vy(e) {
  for (let n of e) n.remove();
}
function jy(e, n) {
  let t = n.createElement("style");
  return (t.textContent = e), t;
}
function iS(e, n, t) {
  let r = e.head?.querySelectorAll(`style[${Od}="${n}"]`);
  if (r)
    for (let i of r)
      i.textContent &&
        (i.removeAttribute(Od),
        t.set(i.textContent, { usage: 0, elements: [i] }));
}
function Fd(e, n) {
  let t = n.createElement("link");
  return t.setAttribute("rel", "stylesheet"), t.setAttribute("href", e), t;
}
var Hy = (() => {
    class e {
      doc;
      appId;
      nonce;
      inline = new Map();
      external = new Map();
      hosts = new Set();
      isServer;
      constructor(t, r, i, o = {}) {
        (this.doc = t),
          (this.appId = r),
          (this.nonce = i),
          (this.isServer = ja(o)),
          iS(t, r, this.inline),
          this.hosts.add(t.head);
      }
      addStyles(t, r) {
        for (let i of t) this.addUsage(i, this.inline, jy);
        r?.forEach((i) => this.addUsage(i, this.external, Fd));
      }
      removeStyles(t, r) {
        for (let i of t) this.removeUsage(i, this.inline);
        r?.forEach((i) => this.removeUsage(i, this.external));
      }
      addUsage(t, r, i) {
        let o = r.get(t);
        o
          ? o.usage++
          : r.set(t, {
              usage: 1,
              elements: [...this.hosts].map((s) =>
                this.addElement(s, i(t, this.doc))
              ),
            });
      }
      removeUsage(t, r) {
        let i = r.get(t);
        i && (i.usage--, i.usage <= 0 && (Vy(i.elements), r.delete(t)));
      }
      ngOnDestroy() {
        for (let [, { elements: t }] of [...this.inline, ...this.external])
          Vy(t);
        this.hosts.clear();
      }
      addHost(t) {
        this.hosts.add(t);
        for (let [r, { elements: i }] of this.inline)
          i.push(this.addElement(t, jy(r, this.doc)));
        for (let [r, { elements: i }] of this.external)
          i.push(this.addElement(t, Fd(r, this.doc)));
      }
      removeHost(t) {
        this.hosts.delete(t);
      }
      addElement(t, r) {
        return (
          this.nonce && r.setAttribute("nonce", this.nonce),
          this.isServer && r.setAttribute(Od, this.appId),
          t.appendChild(r)
        );
      }
      static ɵfac = function (r) {
        return new (r || e)(M(Me), M($u), M(Gu, 8), M(Xt));
      };
      static ɵprov = b({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  Ad = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: "http://www.w3.org/1999/xhtml",
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/",
    math: "http://www.w3.org/1998/Math/MathML",
  },
  Ld = /%COMP%/g,
  zy = "%COMP%",
  oS = `_nghost-${zy}`,
  sS = `_ngcontent-${zy}`,
  aS = !0,
  lS = new I("", { providedIn: "root", factory: () => aS });
function cS(e) {
  return sS.replace(Ld, e);
}
function uS(e) {
  return oS.replace(Ld, e);
}
function Gy(e, n) {
  return n.map((t) => t.replace(Ld, e));
}
var Ga = (() => {
    class e {
      eventManager;
      sharedStylesHost;
      appId;
      removeStylesOnCompDestroy;
      doc;
      platformId;
      ngZone;
      nonce;
      rendererByCompId = new Map();
      defaultRenderer;
      platformIsServer;
      constructor(t, r, i, o, s, a, l, c = null) {
        (this.eventManager = t),
          (this.sharedStylesHost = r),
          (this.appId = i),
          (this.removeStylesOnCompDestroy = o),
          (this.doc = s),
          (this.platformId = a),
          (this.ngZone = l),
          (this.nonce = c),
          (this.platformIsServer = ja(a)),
          (this.defaultRenderer = new Ji(t, s, l, this.platformIsServer));
      }
      createRenderer(t, r) {
        if (!t || !r) return this.defaultRenderer;
        this.platformIsServer &&
          r.encapsulation === Rt.ShadowDom &&
          (r = q(w({}, r), { encapsulation: Rt.Emulated }));
        let i = this.getOrCreateRenderer(t, r);
        return (
          i instanceof qa
            ? i.applyToHost(t)
            : i instanceof Xi && i.applyStyles(),
          i
        );
      }
      getOrCreateRenderer(t, r) {
        let i = this.rendererByCompId,
          o = i.get(r.id);
        if (!o) {
          let s = this.doc,
            a = this.ngZone,
            l = this.eventManager,
            c = this.sharedStylesHost,
            u = this.removeStylesOnCompDestroy,
            d = this.platformIsServer;
          switch (r.encapsulation) {
            case Rt.Emulated:
              o = new qa(l, c, r, this.appId, u, s, a, d);
              break;
            case Rt.ShadowDom:
              return new kd(l, c, t, r, s, a, this.nonce, d);
            default:
              o = new Xi(l, c, r, u, s, a, d);
              break;
          }
          i.set(r.id, o);
        }
        return o;
      }
      ngOnDestroy() {
        this.rendererByCompId.clear();
      }
      static ɵfac = function (r) {
        return new (r || e)(
          M($y),
          M(Hy),
          M($u),
          M(lS),
          M(Me),
          M(Xt),
          M(ee),
          M(Gu)
        );
      };
      static ɵprov = b({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  Ji = class {
    eventManager;
    doc;
    ngZone;
    platformIsServer;
    data = Object.create(null);
    throwOnSyntheticProps = !0;
    constructor(n, t, r, i) {
      (this.eventManager = n),
        (this.doc = t),
        (this.ngZone = r),
        (this.platformIsServer = i);
    }
    destroy() {}
    destroyNode = null;
    createElement(n, t) {
      return t
        ? this.doc.createElementNS(Ad[t] || t, n)
        : this.doc.createElement(n);
    }
    createComment(n) {
      return this.doc.createComment(n);
    }
    createText(n) {
      return this.doc.createTextNode(n);
    }
    appendChild(n, t) {
      (By(n) ? n.content : n).appendChild(t);
    }
    insertBefore(n, t, r) {
      n && (By(n) ? n.content : n).insertBefore(t, r);
    }
    removeChild(n, t) {
      t.remove();
    }
    selectRootElement(n, t) {
      let r = typeof n == "string" ? this.doc.querySelector(n) : n;
      if (!r) throw new D(-5104, !1);
      return t || (r.textContent = ""), r;
    }
    parentNode(n) {
      return n.parentNode;
    }
    nextSibling(n) {
      return n.nextSibling;
    }
    setAttribute(n, t, r, i) {
      if (i) {
        t = i + ":" + t;
        let o = Ad[i];
        o ? n.setAttributeNS(o, t, r) : n.setAttribute(t, r);
      } else n.setAttribute(t, r);
    }
    removeAttribute(n, t, r) {
      if (r) {
        let i = Ad[r];
        i ? n.removeAttributeNS(i, t) : n.removeAttribute(`${r}:${t}`);
      } else n.removeAttribute(t);
    }
    addClass(n, t) {
      n.classList.add(t);
    }
    removeClass(n, t) {
      n.classList.remove(t);
    }
    setStyle(n, t, r, i) {
      i & (Pt.DashCase | Pt.Important)
        ? n.style.setProperty(t, r, i & Pt.Important ? "important" : "")
        : (n.style[t] = r);
    }
    removeStyle(n, t, r) {
      r & Pt.DashCase ? n.style.removeProperty(t) : (n.style[t] = "");
    }
    setProperty(n, t, r) {
      n != null && (n[t] = r);
    }
    setValue(n, t) {
      n.nodeValue = t;
    }
    listen(n, t, r) {
      if (
        typeof n == "string" &&
        ((n = kt().getGlobalEventTarget(this.doc, n)), !n)
      )
        throw new Error(`Unsupported event target ${n} for event ${t}`);
      return this.eventManager.addEventListener(
        n,
        t,
        this.decoratePreventDefault(r)
      );
    }
    decoratePreventDefault(n) {
      return (t) => {
        if (t === "__ngUnwrap__") return n;
        (this.platformIsServer ? this.ngZone.runGuarded(() => n(t)) : n(t)) ===
          !1 && t.preventDefault();
      };
    }
  };
function By(e) {
  return e.tagName === "TEMPLATE" && e.content !== void 0;
}
var kd = class extends Ji {
    sharedStylesHost;
    hostEl;
    shadowRoot;
    constructor(n, t, r, i, o, s, a, l) {
      super(n, o, s, l),
        (this.sharedStylesHost = t),
        (this.hostEl = r),
        (this.shadowRoot = r.attachShadow({ mode: "open" })),
        this.sharedStylesHost.addHost(this.shadowRoot);
      let c = Gy(i.id, i.styles);
      for (let d of c) {
        let h = document.createElement("style");
        a && h.setAttribute("nonce", a),
          (h.textContent = d),
          this.shadowRoot.appendChild(h);
      }
      let u = i.getExternalStyles?.();
      if (u)
        for (let d of u) {
          let h = Fd(d, o);
          a && h.setAttribute("nonce", a), this.shadowRoot.appendChild(h);
        }
    }
    nodeOrShadowRoot(n) {
      return n === this.hostEl ? this.shadowRoot : n;
    }
    appendChild(n, t) {
      return super.appendChild(this.nodeOrShadowRoot(n), t);
    }
    insertBefore(n, t, r) {
      return super.insertBefore(this.nodeOrShadowRoot(n), t, r);
    }
    removeChild(n, t) {
      return super.removeChild(null, t);
    }
    parentNode(n) {
      return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(n)));
    }
    destroy() {
      this.sharedStylesHost.removeHost(this.shadowRoot);
    }
  },
  Xi = class extends Ji {
    sharedStylesHost;
    removeStylesOnCompDestroy;
    styles;
    styleUrls;
    constructor(n, t, r, i, o, s, a, l) {
      super(n, o, s, a),
        (this.sharedStylesHost = t),
        (this.removeStylesOnCompDestroy = i),
        (this.styles = l ? Gy(l, r.styles) : r.styles),
        (this.styleUrls = r.getExternalStyles?.(l));
    }
    applyStyles() {
      this.sharedStylesHost.addStyles(this.styles, this.styleUrls);
    }
    destroy() {
      this.removeStylesOnCompDestroy &&
        this.sharedStylesHost.removeStyles(this.styles, this.styleUrls);
    }
  },
  qa = class extends Xi {
    contentAttr;
    hostAttr;
    constructor(n, t, r, i, o, s, a, l) {
      let c = i + "-" + r.id;
      super(n, t, r, o, s, a, l, c),
        (this.contentAttr = cS(c)),
        (this.hostAttr = uS(c));
    }
    applyToHost(n) {
      this.applyStyles(), this.setAttribute(n, this.hostAttr, "");
    }
    createElement(n, t) {
      let r = super.createElement(n, t);
      return super.setAttribute(r, this.contentAttr, ""), r;
    }
  },
  dS = (() => {
    class e extends za {
      constructor(t) {
        super(t);
      }
      supports(t) {
        return !0;
      }
      addEventListener(t, r, i) {
        return (
          t.addEventListener(r, i, !1), () => this.removeEventListener(t, r, i)
        );
      }
      removeEventListener(t, r, i) {
        return t.removeEventListener(r, i);
      }
      static ɵfac = function (r) {
        return new (r || e)(M(Me));
      };
      static ɵprov = b({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  Uy = ["alt", "control", "meta", "shift"],
  fS = {
    "\b": "Backspace",
    "	": "Tab",
    "\x7F": "Delete",
    "\x1B": "Escape",
    Del: "Delete",
    Esc: "Escape",
    Left: "ArrowLeft",
    Right: "ArrowRight",
    Up: "ArrowUp",
    Down: "ArrowDown",
    Menu: "ContextMenu",
    Scroll: "ScrollLock",
    Win: "OS",
  },
  hS = {
    alt: (e) => e.altKey,
    control: (e) => e.ctrlKey,
    meta: (e) => e.metaKey,
    shift: (e) => e.shiftKey,
  },
  pS = (() => {
    class e extends za {
      constructor(t) {
        super(t);
      }
      supports(t) {
        return e.parseEventName(t) != null;
      }
      addEventListener(t, r, i) {
        let o = e.parseEventName(r),
          s = e.eventCallback(o.fullKey, i, this.manager.getZone());
        return this.manager
          .getZone()
          .runOutsideAngular(() => kt().onAndCancel(t, o.domEventName, s));
      }
      static parseEventName(t) {
        let r = t.toLowerCase().split("."),
          i = r.shift();
        if (r.length === 0 || !(i === "keydown" || i === "keyup")) return null;
        let o = e._normalizeKey(r.pop()),
          s = "",
          a = r.indexOf("code");
        if (
          (a > -1 && (r.splice(a, 1), (s = "code.")),
          Uy.forEach((c) => {
            let u = r.indexOf(c);
            u > -1 && (r.splice(u, 1), (s += c + "."));
          }),
          (s += o),
          r.length != 0 || o.length === 0)
        )
          return null;
        let l = {};
        return (l.domEventName = i), (l.fullKey = s), l;
      }
      static matchEventFullKeyCode(t, r) {
        let i = fS[t.key] || t.key,
          o = "";
        return (
          r.indexOf("code.") > -1 && ((i = t.code), (o = "code.")),
          i == null || !i
            ? !1
            : ((i = i.toLowerCase()),
              i === " " ? (i = "space") : i === "." && (i = "dot"),
              Uy.forEach((s) => {
                if (s !== i) {
                  let a = hS[s];
                  a(t) && (o += s + ".");
                }
              }),
              (o += i),
              o === r)
        );
      }
      static eventCallback(t, r, i) {
        return (o) => {
          e.matchEventFullKeyCode(o, t) && i.runGuarded(() => r(o));
        };
      }
      static _normalizeKey(t) {
        return t === "esc" ? "escape" : t;
      }
      static ɵfac = function (r) {
        return new (r || e)(M(Me));
      };
      static ɵprov = b({ token: e, factory: e.ɵfac });
    }
    return e;
  })();
function gS() {
  xd.makeCurrent();
}
function mS() {
  return new Qt();
}
function yS() {
  return Xg(document), document;
}
var vS = [
    { provide: Xt, useValue: wd },
    { provide: Hu, useValue: gS, multi: !0 },
    { provide: Me, useFactory: yS, deps: [] },
  ],
  qy = cd(iy, "browser", vS),
  DS = new I(""),
  _S = [
    { provide: Bi, useClass: Rd, deps: [] },
    { provide: od, useClass: ba, deps: [ee, Ia, Bi] },
    { provide: ba, useClass: ba, deps: [ee, Ia, Bi] },
  ],
  ES = [
    { provide: sa, useValue: "root" },
    { provide: Qt, useFactory: mS, deps: [] },
    { provide: Pd, useClass: dS, multi: !0, deps: [Me, ee, Xt] },
    { provide: Pd, useClass: pS, multi: !0, deps: [Me] },
    Ga,
    Hy,
    $y,
    { provide: bn, useExisting: Ga },
    { provide: Yr, useClass: rS, deps: [] },
    [],
  ],
  Wa = (() => {
    class e {
      constructor(t) {}
      static ɵfac = function (r) {
        return new (r || e)(M(DS, 12));
      };
      static ɵmod = Se({ type: e });
      static ɵinj = Ie({ providers: [...ES, ..._S], imports: [Ey, oy] });
    }
    return e;
  })();
var Wy = (() => {
  class e {
    _doc;
    constructor(t) {
      this._doc = t;
    }
    getTitle() {
      return this._doc.title;
    }
    setTitle(t) {
      this._doc.title = t || "";
    }
    static ɵfac = function (r) {
      return new (r || e)(M(Me));
    };
    static ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" });
  }
  return e;
})();
var B = "primary",
  po = Symbol("RouteTitle"),
  $d = class {
    params;
    constructor(n) {
      this.params = n || {};
    }
    has(n) {
      return Object.prototype.hasOwnProperty.call(this.params, n);
    }
    get(n) {
      if (this.has(n)) {
        let t = this.params[n];
        return Array.isArray(t) ? t[0] : t;
      }
      return null;
    }
    getAll(n) {
      if (this.has(n)) {
        let t = this.params[n];
        return Array.isArray(t) ? t : [t];
      }
      return [];
    }
    get keys() {
      return Object.keys(this.params);
    }
  };
function oi(e) {
  return new $d(e);
}
function wS(e, n, t) {
  let r = t.path.split("/");
  if (
    r.length > e.length ||
    (t.pathMatch === "full" && (n.hasChildren() || r.length < e.length))
  )
    return null;
  let i = {};
  for (let o = 0; o < r.length; o++) {
    let s = r[o],
      a = e[o];
    if (s[0] === ":") i[s.substring(1)] = a;
    else if (s !== a.path) return null;
  }
  return { consumed: e.slice(0, r.length), posParams: i };
}
function CS(e, n) {
  if (e.length !== n.length) return !1;
  for (let t = 0; t < e.length; ++t) if (!Lt(e[t], n[t])) return !1;
  return !0;
}
function Lt(e, n) {
  let t = e ? Hd(e) : void 0,
    r = n ? Hd(n) : void 0;
  if (!t || !r || t.length != r.length) return !1;
  let i;
  for (let o = 0; o < t.length; o++)
    if (((i = t[o]), !ov(e[i], n[i]))) return !1;
  return !0;
}
function Hd(e) {
  return [...Object.keys(e), ...Object.getOwnPropertySymbols(e)];
}
function ov(e, n) {
  if (Array.isArray(e) && Array.isArray(n)) {
    if (e.length !== n.length) return !1;
    let t = [...e].sort(),
      r = [...n].sort();
    return t.every((i, o) => r[o] === i);
  } else return e === n;
}
function sv(e) {
  return e.length > 0 ? e[e.length - 1] : null;
}
function Fn(e) {
  return hc(e) ? e : nr(e) ? ae(Promise.resolve(e)) : P(e);
}
var bS = { exact: lv, subset: cv },
  av = { exact: IS, subset: SS, ignored: () => !0 };
function Zy(e, n, t) {
  return (
    bS[t.paths](e.root, n.root, t.matrixParams) &&
    av[t.queryParams](e.queryParams, n.queryParams) &&
    !(t.fragment === "exact" && e.fragment !== n.fragment)
  );
}
function IS(e, n) {
  return Lt(e, n);
}
function lv(e, n, t) {
  if (
    !sr(e.segments, n.segments) ||
    !Ka(e.segments, n.segments, t) ||
    e.numberOfChildren !== n.numberOfChildren
  )
    return !1;
  for (let r in n.children)
    if (!e.children[r] || !lv(e.children[r], n.children[r], t)) return !1;
  return !0;
}
function SS(e, n) {
  return (
    Object.keys(n).length <= Object.keys(e).length &&
    Object.keys(n).every((t) => ov(e[t], n[t]))
  );
}
function cv(e, n, t) {
  return uv(e, n, n.segments, t);
}
function uv(e, n, t, r) {
  if (e.segments.length > t.length) {
    let i = e.segments.slice(0, t.length);
    return !(!sr(i, t) || n.hasChildren() || !Ka(i, t, r));
  } else if (e.segments.length === t.length) {
    if (!sr(e.segments, t) || !Ka(e.segments, t, r)) return !1;
    for (let i in n.children)
      if (!e.children[i] || !cv(e.children[i], n.children[i], r)) return !1;
    return !0;
  } else {
    let i = t.slice(0, e.segments.length),
      o = t.slice(e.segments.length);
    return !sr(e.segments, i) || !Ka(e.segments, i, r) || !e.children[B]
      ? !1
      : uv(e.children[B], n, o, r);
  }
}
function Ka(e, n, t) {
  return n.every((r, i) => av[t](e[i].parameters, r.parameters));
}
var cn = class {
    root;
    queryParams;
    fragment;
    _queryParamMap;
    constructor(n = new te([], {}), t = {}, r = null) {
      (this.root = n), (this.queryParams = t), (this.fragment = r);
    }
    get queryParamMap() {
      return (
        (this._queryParamMap ??= oi(this.queryParams)), this._queryParamMap
      );
    }
    toString() {
      return AS.serialize(this);
    }
  },
  te = class {
    segments;
    children;
    parent = null;
    constructor(n, t) {
      (this.segments = n),
        (this.children = t),
        Object.values(t).forEach((r) => (r.parent = this));
    }
    hasChildren() {
      return this.numberOfChildren > 0;
    }
    get numberOfChildren() {
      return Object.keys(this.children).length;
    }
    toString() {
      return Ya(this);
    }
  },
  or = class {
    path;
    parameters;
    _parameterMap;
    constructor(n, t) {
      (this.path = n), (this.parameters = t);
    }
    get parameterMap() {
      return (this._parameterMap ??= oi(this.parameters)), this._parameterMap;
    }
    toString() {
      return fv(this);
    }
  };
function MS(e, n) {
  return sr(e, n) && e.every((t, r) => Lt(t.parameters, n[r].parameters));
}
function sr(e, n) {
  return e.length !== n.length ? !1 : e.every((t, r) => t.path === n[r].path);
}
function TS(e, n) {
  let t = [];
  return (
    Object.entries(e.children).forEach(([r, i]) => {
      r === B && (t = t.concat(n(i, r)));
    }),
    Object.entries(e.children).forEach(([r, i]) => {
      r !== B && (t = t.concat(n(i, r)));
    }),
    t
  );
}
var go = (() => {
    class e {
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = b({
        token: e,
        factory: () => new si(),
        providedIn: "root",
      });
    }
    return e;
  })(),
  si = class {
    parse(n) {
      let t = new Gd(n);
      return new cn(
        t.parseRootSegment(),
        t.parseQueryParams(),
        t.parseFragment()
      );
    }
    serialize(n) {
      let t = `/${eo(n.root, !0)}`,
        r = RS(n.queryParams),
        i = typeof n.fragment == "string" ? `#${NS(n.fragment)}` : "";
      return `${t}${r}${i}`;
    }
  },
  AS = new si();
function Ya(e) {
  return e.segments.map((n) => fv(n)).join("/");
}
function eo(e, n) {
  if (!e.hasChildren()) return Ya(e);
  if (n) {
    let t = e.children[B] ? eo(e.children[B], !1) : "",
      r = [];
    return (
      Object.entries(e.children).forEach(([i, o]) => {
        i !== B && r.push(`${i}:${eo(o, !1)}`);
      }),
      r.length > 0 ? `${t}(${r.join("//")})` : t
    );
  } else {
    let t = TS(e, (r, i) =>
      i === B ? [eo(e.children[B], !1)] : [`${i}:${eo(r, !1)}`]
    );
    return Object.keys(e.children).length === 1 && e.children[B] != null
      ? `${Ya(e)}/${t[0]}`
      : `${Ya(e)}/(${t.join("//")})`;
  }
}
function dv(e) {
  return encodeURIComponent(e)
    .replace(/%40/g, "@")
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",");
}
function Qa(e) {
  return dv(e).replace(/%3B/gi, ";");
}
function NS(e) {
  return encodeURI(e);
}
function zd(e) {
  return dv(e)
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/%26/gi, "&");
}
function Ja(e) {
  return decodeURIComponent(e);
}
function Ky(e) {
  return Ja(e.replace(/\+/g, "%20"));
}
function fv(e) {
  return `${zd(e.path)}${xS(e.parameters)}`;
}
function xS(e) {
  return Object.entries(e)
    .map(([n, t]) => `;${zd(n)}=${zd(t)}`)
    .join("");
}
function RS(e) {
  let n = Object.entries(e)
    .map(([t, r]) =>
      Array.isArray(r)
        ? r.map((i) => `${Qa(t)}=${Qa(i)}`).join("&")
        : `${Qa(t)}=${Qa(r)}`
    )
    .filter((t) => t);
  return n.length ? `?${n.join("&")}` : "";
}
var PS = /^[^\/()?;#]+/;
function Vd(e) {
  let n = e.match(PS);
  return n ? n[0] : "";
}
var OS = /^[^\/()?;=#]+/;
function FS(e) {
  let n = e.match(OS);
  return n ? n[0] : "";
}
var kS = /^[^=?&#]+/;
function LS(e) {
  let n = e.match(kS);
  return n ? n[0] : "";
}
var VS = /^[^&#]+/;
function jS(e) {
  let n = e.match(VS);
  return n ? n[0] : "";
}
var Gd = class {
  url;
  remaining;
  constructor(n) {
    (this.url = n), (this.remaining = n);
  }
  parseRootSegment() {
    return (
      this.consumeOptional("/"),
      this.remaining === "" ||
      this.peekStartsWith("?") ||
      this.peekStartsWith("#")
        ? new te([], {})
        : new te([], this.parseChildren())
    );
  }
  parseQueryParams() {
    let n = {};
    if (this.consumeOptional("?"))
      do this.parseQueryParam(n);
      while (this.consumeOptional("&"));
    return n;
  }
  parseFragment() {
    return this.consumeOptional("#")
      ? decodeURIComponent(this.remaining)
      : null;
  }
  parseChildren() {
    if (this.remaining === "") return {};
    this.consumeOptional("/");
    let n = [];
    for (
      this.peekStartsWith("(") || n.push(this.parseSegment());
      this.peekStartsWith("/") &&
      !this.peekStartsWith("//") &&
      !this.peekStartsWith("/(");

    )
      this.capture("/"), n.push(this.parseSegment());
    let t = {};
    this.peekStartsWith("/(") &&
      (this.capture("/"), (t = this.parseParens(!0)));
    let r = {};
    return (
      this.peekStartsWith("(") && (r = this.parseParens(!1)),
      (n.length > 0 || Object.keys(t).length > 0) && (r[B] = new te(n, t)),
      r
    );
  }
  parseSegment() {
    let n = Vd(this.remaining);
    if (n === "" && this.peekStartsWith(";")) throw new D(4009, !1);
    return this.capture(n), new or(Ja(n), this.parseMatrixParams());
  }
  parseMatrixParams() {
    let n = {};
    for (; this.consumeOptional(";"); ) this.parseParam(n);
    return n;
  }
  parseParam(n) {
    let t = FS(this.remaining);
    if (!t) return;
    this.capture(t);
    let r = "";
    if (this.consumeOptional("=")) {
      let i = Vd(this.remaining);
      i && ((r = i), this.capture(r));
    }
    n[Ja(t)] = Ja(r);
  }
  parseQueryParam(n) {
    let t = LS(this.remaining);
    if (!t) return;
    this.capture(t);
    let r = "";
    if (this.consumeOptional("=")) {
      let s = jS(this.remaining);
      s && ((r = s), this.capture(r));
    }
    let i = Ky(t),
      o = Ky(r);
    if (n.hasOwnProperty(i)) {
      let s = n[i];
      Array.isArray(s) || ((s = [s]), (n[i] = s)), s.push(o);
    } else n[i] = o;
  }
  parseParens(n) {
    let t = {};
    for (
      this.capture("(");
      !this.consumeOptional(")") && this.remaining.length > 0;

    ) {
      let r = Vd(this.remaining),
        i = this.remaining[r.length];
      if (i !== "/" && i !== ")" && i !== ";") throw new D(4010, !1);
      let o;
      r.indexOf(":") > -1
        ? ((o = r.slice(0, r.indexOf(":"))), this.capture(o), this.capture(":"))
        : n && (o = B);
      let s = this.parseChildren();
      (t[o] = Object.keys(s).length === 1 ? s[B] : new te([], s)),
        this.consumeOptional("//");
    }
    return t;
  }
  peekStartsWith(n) {
    return this.remaining.startsWith(n);
  }
  consumeOptional(n) {
    return this.peekStartsWith(n)
      ? ((this.remaining = this.remaining.substring(n.length)), !0)
      : !1;
  }
  capture(n) {
    if (!this.consumeOptional(n)) throw new D(4011, !1);
  }
};
function hv(e) {
  return e.segments.length > 0 ? new te([], { [B]: e }) : e;
}
function pv(e) {
  let n = {};
  for (let [r, i] of Object.entries(e.children)) {
    let o = pv(i);
    if (r === B && o.segments.length === 0 && o.hasChildren())
      for (let [s, a] of Object.entries(o.children)) n[s] = a;
    else (o.segments.length > 0 || o.hasChildren()) && (n[r] = o);
  }
  let t = new te(e.segments, n);
  return BS(t);
}
function BS(e) {
  if (e.numberOfChildren === 1 && e.children[B]) {
    let n = e.children[B];
    return new te(e.segments.concat(n.segments), n.children);
  }
  return e;
}
function ar(e) {
  return e instanceof cn;
}
function US(e, n, t = null, r = null) {
  let i = gv(e);
  return mv(i, n, t, r);
}
function gv(e) {
  let n;
  function t(o) {
    let s = {};
    for (let l of o.children) {
      let c = t(l);
      s[l.outlet] = c;
    }
    let a = new te(o.url, s);
    return o === e && (n = a), a;
  }
  let r = t(e.root),
    i = hv(r);
  return n ?? i;
}
function mv(e, n, t, r) {
  let i = e;
  for (; i.parent; ) i = i.parent;
  if (n.length === 0) return jd(i, i, i, t, r);
  let o = $S(n);
  if (o.toRoot()) return jd(i, i, new te([], {}), t, r);
  let s = HS(o, i, e),
    a = s.processChildren
      ? ro(s.segmentGroup, s.index, o.commands)
      : vv(s.segmentGroup, s.index, o.commands);
  return jd(i, s.segmentGroup, a, t, r);
}
function Xa(e) {
  return typeof e == "object" && e != null && !e.outlets && !e.segmentPath;
}
function so(e) {
  return typeof e == "object" && e != null && e.outlets;
}
function jd(e, n, t, r, i) {
  let o = {};
  r &&
    Object.entries(r).forEach(([l, c]) => {
      o[l] = Array.isArray(c) ? c.map((u) => `${u}`) : `${c}`;
    });
  let s;
  e === n ? (s = t) : (s = yv(e, n, t));
  let a = hv(pv(s));
  return new cn(a, o, i);
}
function yv(e, n, t) {
  let r = {};
  return (
    Object.entries(e.children).forEach(([i, o]) => {
      o === n ? (r[i] = t) : (r[i] = yv(o, n, t));
    }),
    new te(e.segments, r)
  );
}
var el = class {
  isAbsolute;
  numberOfDoubleDots;
  commands;
  constructor(n, t, r) {
    if (
      ((this.isAbsolute = n),
      (this.numberOfDoubleDots = t),
      (this.commands = r),
      n && r.length > 0 && Xa(r[0]))
    )
      throw new D(4003, !1);
    let i = r.find(so);
    if (i && i !== sv(r)) throw new D(4004, !1);
  }
  toRoot() {
    return (
      this.isAbsolute && this.commands.length === 1 && this.commands[0] == "/"
    );
  }
};
function $S(e) {
  if (typeof e[0] == "string" && e.length === 1 && e[0] === "/")
    return new el(!0, 0, e);
  let n = 0,
    t = !1,
    r = e.reduce((i, o, s) => {
      if (typeof o == "object" && o != null) {
        if (o.outlets) {
          let a = {};
          return (
            Object.entries(o.outlets).forEach(([l, c]) => {
              a[l] = typeof c == "string" ? c.split("/") : c;
            }),
            [...i, { outlets: a }]
          );
        }
        if (o.segmentPath) return [...i, o.segmentPath];
      }
      return typeof o != "string"
        ? [...i, o]
        : s === 0
        ? (o.split("/").forEach((a, l) => {
            (l == 0 && a === ".") ||
              (l == 0 && a === ""
                ? (t = !0)
                : a === ".."
                ? n++
                : a != "" && i.push(a));
          }),
          i)
        : [...i, o];
    }, []);
  return new el(t, n, r);
}
var ni = class {
  segmentGroup;
  processChildren;
  index;
  constructor(n, t, r) {
    (this.segmentGroup = n), (this.processChildren = t), (this.index = r);
  }
};
function HS(e, n, t) {
  if (e.isAbsolute) return new ni(n, !0, 0);
  if (!t) return new ni(n, !1, NaN);
  if (t.parent === null) return new ni(t, !0, 0);
  let r = Xa(e.commands[0]) ? 0 : 1,
    i = t.segments.length - 1 + r;
  return zS(t, i, e.numberOfDoubleDots);
}
function zS(e, n, t) {
  let r = e,
    i = n,
    o = t;
  for (; o > i; ) {
    if (((o -= i), (r = r.parent), !r)) throw new D(4005, !1);
    i = r.segments.length;
  }
  return new ni(r, !1, i - o);
}
function GS(e) {
  return so(e[0]) ? e[0].outlets : { [B]: e };
}
function vv(e, n, t) {
  if (((e ??= new te([], {})), e.segments.length === 0 && e.hasChildren()))
    return ro(e, n, t);
  let r = qS(e, n, t),
    i = t.slice(r.commandIndex);
  if (r.match && r.pathIndex < e.segments.length) {
    let o = new te(e.segments.slice(0, r.pathIndex), {});
    return (
      (o.children[B] = new te(e.segments.slice(r.pathIndex), e.children)),
      ro(o, 0, i)
    );
  } else
    return r.match && i.length === 0
      ? new te(e.segments, {})
      : r.match && !e.hasChildren()
      ? qd(e, n, t)
      : r.match
      ? ro(e, 0, i)
      : qd(e, n, t);
}
function ro(e, n, t) {
  if (t.length === 0) return new te(e.segments, {});
  {
    let r = GS(t),
      i = {};
    if (
      Object.keys(r).some((o) => o !== B) &&
      e.children[B] &&
      e.numberOfChildren === 1 &&
      e.children[B].segments.length === 0
    ) {
      let o = ro(e.children[B], n, t);
      return new te(e.segments, o.children);
    }
    return (
      Object.entries(r).forEach(([o, s]) => {
        typeof s == "string" && (s = [s]),
          s !== null && (i[o] = vv(e.children[o], n, s));
      }),
      Object.entries(e.children).forEach(([o, s]) => {
        r[o] === void 0 && (i[o] = s);
      }),
      new te(e.segments, i)
    );
  }
}
function qS(e, n, t) {
  let r = 0,
    i = n,
    o = { match: !1, pathIndex: 0, commandIndex: 0 };
  for (; i < e.segments.length; ) {
    if (r >= t.length) return o;
    let s = e.segments[i],
      a = t[r];
    if (so(a)) break;
    let l = `${a}`,
      c = r < t.length - 1 ? t[r + 1] : null;
    if (i > 0 && l === void 0) break;
    if (l && c && typeof c == "object" && c.outlets === void 0) {
      if (!Jy(l, c, s)) return o;
      r += 2;
    } else {
      if (!Jy(l, {}, s)) return o;
      r++;
    }
    i++;
  }
  return { match: !0, pathIndex: i, commandIndex: r };
}
function qd(e, n, t) {
  let r = e.segments.slice(0, n),
    i = 0;
  for (; i < t.length; ) {
    let o = t[i];
    if (so(o)) {
      let l = WS(o.outlets);
      return new te(r, l);
    }
    if (i === 0 && Xa(t[0])) {
      let l = e.segments[n];
      r.push(new or(l.path, Yy(t[0]))), i++;
      continue;
    }
    let s = so(o) ? o.outlets[B] : `${o}`,
      a = i < t.length - 1 ? t[i + 1] : null;
    s && a && Xa(a)
      ? (r.push(new or(s, Yy(a))), (i += 2))
      : (r.push(new or(s, {})), i++);
  }
  return new te(r, {});
}
function WS(e) {
  let n = {};
  return (
    Object.entries(e).forEach(([t, r]) => {
      typeof r == "string" && (r = [r]),
        r !== null && (n[t] = qd(new te([], {}), 0, r));
    }),
    n
  );
}
function Yy(e) {
  let n = {};
  return Object.entries(e).forEach(([t, r]) => (n[t] = `${r}`)), n;
}
function Jy(e, n, t) {
  return e == t.path && Lt(n, t.parameters);
}
var io = "imperative",
  Te = (function (e) {
    return (
      (e[(e.NavigationStart = 0)] = "NavigationStart"),
      (e[(e.NavigationEnd = 1)] = "NavigationEnd"),
      (e[(e.NavigationCancel = 2)] = "NavigationCancel"),
      (e[(e.NavigationError = 3)] = "NavigationError"),
      (e[(e.RoutesRecognized = 4)] = "RoutesRecognized"),
      (e[(e.ResolveStart = 5)] = "ResolveStart"),
      (e[(e.ResolveEnd = 6)] = "ResolveEnd"),
      (e[(e.GuardsCheckStart = 7)] = "GuardsCheckStart"),
      (e[(e.GuardsCheckEnd = 8)] = "GuardsCheckEnd"),
      (e[(e.RouteConfigLoadStart = 9)] = "RouteConfigLoadStart"),
      (e[(e.RouteConfigLoadEnd = 10)] = "RouteConfigLoadEnd"),
      (e[(e.ChildActivationStart = 11)] = "ChildActivationStart"),
      (e[(e.ChildActivationEnd = 12)] = "ChildActivationEnd"),
      (e[(e.ActivationStart = 13)] = "ActivationStart"),
      (e[(e.ActivationEnd = 14)] = "ActivationEnd"),
      (e[(e.Scroll = 15)] = "Scroll"),
      (e[(e.NavigationSkipped = 16)] = "NavigationSkipped"),
      e
    );
  })(Te || {}),
  ct = class {
    id;
    url;
    constructor(n, t) {
      (this.id = n), (this.url = t);
    }
  },
  Pn = class extends ct {
    type = Te.NavigationStart;
    navigationTrigger;
    restoredState;
    constructor(n, t, r = "imperative", i = null) {
      super(n, t), (this.navigationTrigger = r), (this.restoredState = i);
    }
    toString() {
      return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
    }
  },
  ut = class extends ct {
    urlAfterRedirects;
    type = Te.NavigationEnd;
    constructor(n, t, r) {
      super(n, t), (this.urlAfterRedirects = r);
    }
    toString() {
      return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
    }
  },
  et = (function (e) {
    return (
      (e[(e.Redirect = 0)] = "Redirect"),
      (e[(e.SupersededByNewNavigation = 1)] = "SupersededByNewNavigation"),
      (e[(e.NoDataFromResolver = 2)] = "NoDataFromResolver"),
      (e[(e.GuardRejected = 3)] = "GuardRejected"),
      e
    );
  })(et || {}),
  tl = (function (e) {
    return (
      (e[(e.IgnoredSameUrlNavigation = 0)] = "IgnoredSameUrlNavigation"),
      (e[(e.IgnoredByUrlHandlingStrategy = 1)] =
        "IgnoredByUrlHandlingStrategy"),
      e
    );
  })(tl || {}),
  ln = class extends ct {
    reason;
    code;
    type = Te.NavigationCancel;
    constructor(n, t, r, i) {
      super(n, t), (this.reason = r), (this.code = i);
    }
    toString() {
      return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
    }
  },
  On = class extends ct {
    reason;
    code;
    type = Te.NavigationSkipped;
    constructor(n, t, r, i) {
      super(n, t), (this.reason = r), (this.code = i);
    }
  },
  ao = class extends ct {
    error;
    target;
    type = Te.NavigationError;
    constructor(n, t, r, i) {
      super(n, t), (this.error = r), (this.target = i);
    }
    toString() {
      return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
    }
  },
  nl = class extends ct {
    urlAfterRedirects;
    state;
    type = Te.RoutesRecognized;
    constructor(n, t, r, i) {
      super(n, t), (this.urlAfterRedirects = r), (this.state = i);
    }
    toString() {
      return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  Wd = class extends ct {
    urlAfterRedirects;
    state;
    type = Te.GuardsCheckStart;
    constructor(n, t, r, i) {
      super(n, t), (this.urlAfterRedirects = r), (this.state = i);
    }
    toString() {
      return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  Qd = class extends ct {
    urlAfterRedirects;
    state;
    shouldActivate;
    type = Te.GuardsCheckEnd;
    constructor(n, t, r, i, o) {
      super(n, t),
        (this.urlAfterRedirects = r),
        (this.state = i),
        (this.shouldActivate = o);
    }
    toString() {
      return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
    }
  },
  Zd = class extends ct {
    urlAfterRedirects;
    state;
    type = Te.ResolveStart;
    constructor(n, t, r, i) {
      super(n, t), (this.urlAfterRedirects = r), (this.state = i);
    }
    toString() {
      return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  Kd = class extends ct {
    urlAfterRedirects;
    state;
    type = Te.ResolveEnd;
    constructor(n, t, r, i) {
      super(n, t), (this.urlAfterRedirects = r), (this.state = i);
    }
    toString() {
      return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  Yd = class {
    route;
    type = Te.RouteConfigLoadStart;
    constructor(n) {
      this.route = n;
    }
    toString() {
      return `RouteConfigLoadStart(path: ${this.route.path})`;
    }
  },
  Jd = class {
    route;
    type = Te.RouteConfigLoadEnd;
    constructor(n) {
      this.route = n;
    }
    toString() {
      return `RouteConfigLoadEnd(path: ${this.route.path})`;
    }
  },
  Xd = class {
    snapshot;
    type = Te.ChildActivationStart;
    constructor(n) {
      this.snapshot = n;
    }
    toString() {
      return `ChildActivationStart(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  },
  ef = class {
    snapshot;
    type = Te.ChildActivationEnd;
    constructor(n) {
      this.snapshot = n;
    }
    toString() {
      return `ChildActivationEnd(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  },
  tf = class {
    snapshot;
    type = Te.ActivationStart;
    constructor(n) {
      this.snapshot = n;
    }
    toString() {
      return `ActivationStart(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  },
  nf = class {
    snapshot;
    type = Te.ActivationEnd;
    constructor(n) {
      this.snapshot = n;
    }
    toString() {
      return `ActivationEnd(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  },
  rl = class {
    routerEvent;
    position;
    anchor;
    type = Te.Scroll;
    constructor(n, t, r) {
      (this.routerEvent = n), (this.position = t), (this.anchor = r);
    }
    toString() {
      let n = this.position ? `${this.position[0]}, ${this.position[1]}` : null;
      return `Scroll(anchor: '${this.anchor}', position: '${n}')`;
    }
  },
  lo = class {},
  ai = class {
    url;
    navigationBehaviorOptions;
    constructor(n, t) {
      (this.url = n), (this.navigationBehaviorOptions = t);
    }
  };
function QS(e, n) {
  return (
    e.providers &&
      !e._injector &&
      (e._injector = wa(e.providers, n, `Route: ${e.path}`)),
    e._injector ?? n
  );
}
function _t(e) {
  return e.outlet || B;
}
function ZS(e, n) {
  let t = e.filter((r) => _t(r) === n);
  return t.push(...e.filter((r) => _t(r) !== n)), t;
}
function mo(e) {
  if (!e) return null;
  if (e.routeConfig?._injector) return e.routeConfig._injector;
  for (let n = e.parent; n; n = n.parent) {
    let t = n.routeConfig;
    if (t?._loadedInjector) return t._loadedInjector;
    if (t?._injector) return t._injector;
  }
  return null;
}
var rf = class {
    rootInjector;
    outlet = null;
    route = null;
    children;
    attachRef = null;
    get injector() {
      return mo(this.route?.snapshot) ?? this.rootInjector;
    }
    constructor(n) {
      (this.rootInjector = n), (this.children = new yo(this.rootInjector));
    }
  },
  yo = (() => {
    class e {
      rootInjector;
      contexts = new Map();
      constructor(t) {
        this.rootInjector = t;
      }
      onChildOutletCreated(t, r) {
        let i = this.getOrCreateContext(t);
        (i.outlet = r), this.contexts.set(t, i);
      }
      onChildOutletDestroyed(t) {
        let r = this.getContext(t);
        r && ((r.outlet = null), (r.attachRef = null));
      }
      onOutletDeactivated() {
        let t = this.contexts;
        return (this.contexts = new Map()), t;
      }
      onOutletReAttached(t) {
        this.contexts = t;
      }
      getOrCreateContext(t) {
        let r = this.getContext(t);
        return (
          r || ((r = new rf(this.rootInjector)), this.contexts.set(t, r)), r
        );
      }
      getContext(t) {
        return this.contexts.get(t) || null;
      }
      static ɵfac = function (r) {
        return new (r || e)(M(Oe));
      };
      static ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })(),
  il = class {
    _root;
    constructor(n) {
      this._root = n;
    }
    get root() {
      return this._root.value;
    }
    parent(n) {
      let t = this.pathFromRoot(n);
      return t.length > 1 ? t[t.length - 2] : null;
    }
    children(n) {
      let t = of(n, this._root);
      return t ? t.children.map((r) => r.value) : [];
    }
    firstChild(n) {
      let t = of(n, this._root);
      return t && t.children.length > 0 ? t.children[0].value : null;
    }
    siblings(n) {
      let t = sf(n, this._root);
      return t.length < 2
        ? []
        : t[t.length - 2].children.map((i) => i.value).filter((i) => i !== n);
    }
    pathFromRoot(n) {
      return sf(n, this._root).map((t) => t.value);
    }
  };
function of(e, n) {
  if (e === n.value) return n;
  for (let t of n.children) {
    let r = of(e, t);
    if (r) return r;
  }
  return null;
}
function sf(e, n) {
  if (e === n.value) return [n];
  for (let t of n.children) {
    let r = sf(e, t);
    if (r.length) return r.unshift(n), r;
  }
  return [];
}
var Xe = class {
  value;
  children;
  constructor(n, t) {
    (this.value = n), (this.children = t);
  }
  toString() {
    return `TreeNode(${this.value})`;
  }
};
function ti(e) {
  let n = {};
  return e && e.children.forEach((t) => (n[t.value.outlet] = t)), n;
}
var ol = class extends il {
  snapshot;
  constructor(n, t) {
    super(n), (this.snapshot = t), gf(this, n);
  }
  toString() {
    return this.snapshot.toString();
  }
};
function Dv(e) {
  let n = KS(e),
    t = new Ae([new or("", {})]),
    r = new Ae({}),
    i = new Ae({}),
    o = new Ae({}),
    s = new Ae(""),
    a = new Et(t, r, o, s, i, B, e, n.root);
  return (a.snapshot = n.root), new ol(new Xe(a, []), n);
}
function KS(e) {
  let n = {},
    t = {},
    r = {},
    i = "",
    o = new ri([], n, r, i, t, B, e, null, {});
  return new al("", new Xe(o, []));
}
var Et = class {
  urlSubject;
  paramsSubject;
  queryParamsSubject;
  fragmentSubject;
  dataSubject;
  outlet;
  component;
  snapshot;
  _futureSnapshot;
  _routerState;
  _paramMap;
  _queryParamMap;
  title;
  url;
  params;
  queryParams;
  fragment;
  data;
  constructor(n, t, r, i, o, s, a, l) {
    (this.urlSubject = n),
      (this.paramsSubject = t),
      (this.queryParamsSubject = r),
      (this.fragmentSubject = i),
      (this.dataSubject = o),
      (this.outlet = s),
      (this.component = a),
      (this._futureSnapshot = l),
      (this.title = this.dataSubject?.pipe(L((c) => c[po])) ?? P(void 0)),
      (this.url = n),
      (this.params = t),
      (this.queryParams = r),
      (this.fragment = i),
      (this.data = o);
  }
  get routeConfig() {
    return this._futureSnapshot.routeConfig;
  }
  get root() {
    return this._routerState.root;
  }
  get parent() {
    return this._routerState.parent(this);
  }
  get firstChild() {
    return this._routerState.firstChild(this);
  }
  get children() {
    return this._routerState.children(this);
  }
  get pathFromRoot() {
    return this._routerState.pathFromRoot(this);
  }
  get paramMap() {
    return (
      (this._paramMap ??= this.params.pipe(L((n) => oi(n)))), this._paramMap
    );
  }
  get queryParamMap() {
    return (
      (this._queryParamMap ??= this.queryParams.pipe(L((n) => oi(n)))),
      this._queryParamMap
    );
  }
  toString() {
    return this.snapshot
      ? this.snapshot.toString()
      : `Future(${this._futureSnapshot})`;
  }
};
function sl(e, n, t = "emptyOnly") {
  let r,
    { routeConfig: i } = e;
  return (
    n !== null &&
    (t === "always" ||
      i?.path === "" ||
      (!n.component && !n.routeConfig?.loadComponent))
      ? (r = {
          params: w(w({}, n.params), e.params),
          data: w(w({}, n.data), e.data),
          resolve: w(w(w(w({}, e.data), n.data), i?.data), e._resolvedData),
        })
      : (r = {
          params: w({}, e.params),
          data: w({}, e.data),
          resolve: w(w({}, e.data), e._resolvedData ?? {}),
        }),
    i && Ev(i) && (r.resolve[po] = i.title),
    r
  );
}
var ri = class {
    url;
    params;
    queryParams;
    fragment;
    data;
    outlet;
    component;
    routeConfig;
    _resolve;
    _resolvedData;
    _routerState;
    _paramMap;
    _queryParamMap;
    get title() {
      return this.data?.[po];
    }
    constructor(n, t, r, i, o, s, a, l, c) {
      (this.url = n),
        (this.params = t),
        (this.queryParams = r),
        (this.fragment = i),
        (this.data = o),
        (this.outlet = s),
        (this.component = a),
        (this.routeConfig = l),
        (this._resolve = c);
    }
    get root() {
      return this._routerState.root;
    }
    get parent() {
      return this._routerState.parent(this);
    }
    get firstChild() {
      return this._routerState.firstChild(this);
    }
    get children() {
      return this._routerState.children(this);
    }
    get pathFromRoot() {
      return this._routerState.pathFromRoot(this);
    }
    get paramMap() {
      return (this._paramMap ??= oi(this.params)), this._paramMap;
    }
    get queryParamMap() {
      return (
        (this._queryParamMap ??= oi(this.queryParams)), this._queryParamMap
      );
    }
    toString() {
      let n = this.url.map((r) => r.toString()).join("/"),
        t = this.routeConfig ? this.routeConfig.path : "";
      return `Route(url:'${n}', path:'${t}')`;
    }
  },
  al = class extends il {
    url;
    constructor(n, t) {
      super(t), (this.url = n), gf(this, t);
    }
    toString() {
      return _v(this._root);
    }
  };
function gf(e, n) {
  (n.value._routerState = e), n.children.forEach((t) => gf(e, t));
}
function _v(e) {
  let n = e.children.length > 0 ? ` { ${e.children.map(_v).join(", ")} } ` : "";
  return `${e.value}${n}`;
}
function Bd(e) {
  if (e.snapshot) {
    let n = e.snapshot,
      t = e._futureSnapshot;
    (e.snapshot = t),
      Lt(n.queryParams, t.queryParams) ||
        e.queryParamsSubject.next(t.queryParams),
      n.fragment !== t.fragment && e.fragmentSubject.next(t.fragment),
      Lt(n.params, t.params) || e.paramsSubject.next(t.params),
      CS(n.url, t.url) || e.urlSubject.next(t.url),
      Lt(n.data, t.data) || e.dataSubject.next(t.data);
  } else
    (e.snapshot = e._futureSnapshot),
      e.dataSubject.next(e._futureSnapshot.data);
}
function af(e, n) {
  let t = Lt(e.params, n.params) && MS(e.url, n.url),
    r = !e.parent != !n.parent;
  return t && !r && (!e.parent || af(e.parent, n.parent));
}
function Ev(e) {
  return typeof e.title == "string" || e.title === null;
}
var YS = new I(""),
  mf = (() => {
    class e {
      activated = null;
      get activatedComponentRef() {
        return this.activated;
      }
      _activatedRoute = null;
      name = B;
      activateEvents = new pe();
      deactivateEvents = new pe();
      attachEvents = new pe();
      detachEvents = new pe();
      routerOutletData = qg(void 0);
      parentContexts = v(yo);
      location = v(Gr);
      changeDetector = v(ir);
      inputBinder = v(fl, { optional: !0 });
      supportsBindingToComponentInputs = !0;
      ngOnChanges(t) {
        if (t.name) {
          let { firstChange: r, previousValue: i } = t.name;
          if (r) return;
          this.isTrackedInParentContexts(i) &&
            (this.deactivate(), this.parentContexts.onChildOutletDestroyed(i)),
            this.initializeOutletWithName();
        }
      }
      ngOnDestroy() {
        this.isTrackedInParentContexts(this.name) &&
          this.parentContexts.onChildOutletDestroyed(this.name),
          this.inputBinder?.unsubscribeFromRouteData(this);
      }
      isTrackedInParentContexts(t) {
        return this.parentContexts.getContext(t)?.outlet === this;
      }
      ngOnInit() {
        this.initializeOutletWithName();
      }
      initializeOutletWithName() {
        if (
          (this.parentContexts.onChildOutletCreated(this.name, this),
          this.activated)
        )
          return;
        let t = this.parentContexts.getContext(this.name);
        t?.route &&
          (t.attachRef
            ? this.attach(t.attachRef, t.route)
            : this.activateWith(t.route, t.injector));
      }
      get isActivated() {
        return !!this.activated;
      }
      get component() {
        if (!this.activated) throw new D(4012, !1);
        return this.activated.instance;
      }
      get activatedRoute() {
        if (!this.activated) throw new D(4012, !1);
        return this._activatedRoute;
      }
      get activatedRouteData() {
        return this._activatedRoute ? this._activatedRoute.snapshot.data : {};
      }
      detach() {
        if (!this.activated) throw new D(4012, !1);
        this.location.detach();
        let t = this.activated;
        return (
          (this.activated = null),
          (this._activatedRoute = null),
          this.detachEvents.emit(t.instance),
          t
        );
      }
      attach(t, r) {
        (this.activated = t),
          (this._activatedRoute = r),
          this.location.insert(t.hostView),
          this.inputBinder?.bindActivatedRouteToOutletComponent(this),
          this.attachEvents.emit(t.instance);
      }
      deactivate() {
        if (this.activated) {
          let t = this.component;
          this.activated.destroy(),
            (this.activated = null),
            (this._activatedRoute = null),
            this.deactivateEvents.emit(t);
        }
      }
      activateWith(t, r) {
        if (this.isActivated) throw new D(4013, !1);
        this._activatedRoute = t;
        let i = this.location,
          s = t.snapshot.component,
          a = this.parentContexts.getOrCreateContext(this.name).children,
          l = new lf(t, a, i.injector, this.routerOutletData);
        (this.activated = i.createComponent(s, {
          index: i.length,
          injector: l,
          environmentInjector: r,
        })),
          this.changeDetector.markForCheck(),
          this.inputBinder?.bindActivatedRouteToOutletComponent(this),
          this.activateEvents.emit(this.activated.instance);
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵdir = de({
        type: e,
        selectors: [["router-outlet"]],
        inputs: { name: "name", routerOutletData: [1, "routerOutletData"] },
        outputs: {
          activateEvents: "activate",
          deactivateEvents: "deactivate",
          attachEvents: "attach",
          detachEvents: "detach",
        },
        exportAs: ["outlet"],
        features: [Xn],
      });
    }
    return e;
  })(),
  lf = class e {
    route;
    childContexts;
    parent;
    outletData;
    __ngOutletInjector(n) {
      return new e(this.route, this.childContexts, n, this.outletData);
    }
    constructor(n, t, r, i) {
      (this.route = n),
        (this.childContexts = t),
        (this.parent = r),
        (this.outletData = i);
    }
    get(n, t) {
      return n === Et
        ? this.route
        : n === yo
        ? this.childContexts
        : n === YS
        ? this.outletData
        : this.parent.get(n, t);
    }
  },
  fl = new I(""),
  Xy = (() => {
    class e {
      outletDataSubscriptions = new Map();
      bindActivatedRouteToOutletComponent(t) {
        this.unsubscribeFromRouteData(t), this.subscribeToRouteData(t);
      }
      unsubscribeFromRouteData(t) {
        this.outletDataSubscriptions.get(t)?.unsubscribe(),
          this.outletDataSubscriptions.delete(t);
      }
      subscribeToRouteData(t) {
        let { activatedRoute: r } = t,
          i = bi([r.queryParams, r.params, r.data])
            .pipe(
              Be(
                ([o, s, a], l) => (
                  (a = w(w(w({}, o), s), a)),
                  l === 0 ? P(a) : Promise.resolve(a)
                )
              )
            )
            .subscribe((o) => {
              if (
                !t.isActivated ||
                !t.activatedComponentRef ||
                t.activatedRoute !== r ||
                r.component === null
              ) {
                this.unsubscribeFromRouteData(t);
                return;
              }
              let s = sy(r.component);
              if (!s) {
                this.unsubscribeFromRouteData(t);
                return;
              }
              for (let { templateName: a } of s.inputs)
                t.activatedComponentRef.setInput(a, o[a]);
            });
        this.outletDataSubscriptions.set(t, i);
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = b({ token: e, factory: e.ɵfac });
    }
    return e;
  })();
function JS(e, n, t) {
  let r = co(e, n._root, t ? t._root : void 0);
  return new ol(r, n);
}
function co(e, n, t) {
  if (t && e.shouldReuseRoute(n.value, t.value.snapshot)) {
    let r = t.value;
    r._futureSnapshot = n.value;
    let i = XS(e, n, t);
    return new Xe(r, i);
  } else {
    if (e.shouldAttach(n.value)) {
      let o = e.retrieve(n.value);
      if (o !== null) {
        let s = o.route;
        return (
          (s.value._futureSnapshot = n.value),
          (s.children = n.children.map((a) => co(e, a))),
          s
        );
      }
    }
    let r = eM(n.value),
      i = n.children.map((o) => co(e, o));
    return new Xe(r, i);
  }
}
function XS(e, n, t) {
  return n.children.map((r) => {
    for (let i of t.children)
      if (e.shouldReuseRoute(r.value, i.value.snapshot)) return co(e, r, i);
    return co(e, r);
  });
}
function eM(e) {
  return new Et(
    new Ae(e.url),
    new Ae(e.params),
    new Ae(e.queryParams),
    new Ae(e.fragment),
    new Ae(e.data),
    e.outlet,
    e.component,
    e
  );
}
var uo = class {
    redirectTo;
    navigationBehaviorOptions;
    constructor(n, t) {
      (this.redirectTo = n), (this.navigationBehaviorOptions = t);
    }
  },
  wv = "ngNavigationCancelingError";
function ll(e, n) {
  let { redirectTo: t, navigationBehaviorOptions: r } = ar(n)
      ? { redirectTo: n, navigationBehaviorOptions: void 0 }
      : n,
    i = Cv(!1, et.Redirect);
  return (i.url = t), (i.navigationBehaviorOptions = r), i;
}
function Cv(e, n) {
  let t = new Error(`NavigationCancelingError: ${e || ""}`);
  return (t[wv] = !0), (t.cancellationCode = n), t;
}
function tM(e) {
  return bv(e) && ar(e.url);
}
function bv(e) {
  return !!e && e[wv];
}
var nM = (e, n, t, r) =>
    L(
      (i) => (
        new cf(n, i.targetRouterState, i.currentRouterState, t, r).activate(e),
        i
      )
    ),
  cf = class {
    routeReuseStrategy;
    futureState;
    currState;
    forwardEvent;
    inputBindingEnabled;
    constructor(n, t, r, i, o) {
      (this.routeReuseStrategy = n),
        (this.futureState = t),
        (this.currState = r),
        (this.forwardEvent = i),
        (this.inputBindingEnabled = o);
    }
    activate(n) {
      let t = this.futureState._root,
        r = this.currState ? this.currState._root : null;
      this.deactivateChildRoutes(t, r, n),
        Bd(this.futureState.root),
        this.activateChildRoutes(t, r, n);
    }
    deactivateChildRoutes(n, t, r) {
      let i = ti(t);
      n.children.forEach((o) => {
        let s = o.value.outlet;
        this.deactivateRoutes(o, i[s], r), delete i[s];
      }),
        Object.values(i).forEach((o) => {
          this.deactivateRouteAndItsChildren(o, r);
        });
    }
    deactivateRoutes(n, t, r) {
      let i = n.value,
        o = t ? t.value : null;
      if (i === o)
        if (i.component) {
          let s = r.getContext(i.outlet);
          s && this.deactivateChildRoutes(n, t, s.children);
        } else this.deactivateChildRoutes(n, t, r);
      else o && this.deactivateRouteAndItsChildren(t, r);
    }
    deactivateRouteAndItsChildren(n, t) {
      n.value.component &&
      this.routeReuseStrategy.shouldDetach(n.value.snapshot)
        ? this.detachAndStoreRouteSubtree(n, t)
        : this.deactivateRouteAndOutlet(n, t);
    }
    detachAndStoreRouteSubtree(n, t) {
      let r = t.getContext(n.value.outlet),
        i = r && n.value.component ? r.children : t,
        o = ti(n);
      for (let s of Object.values(o)) this.deactivateRouteAndItsChildren(s, i);
      if (r && r.outlet) {
        let s = r.outlet.detach(),
          a = r.children.onOutletDeactivated();
        this.routeReuseStrategy.store(n.value.snapshot, {
          componentRef: s,
          route: n,
          contexts: a,
        });
      }
    }
    deactivateRouteAndOutlet(n, t) {
      let r = t.getContext(n.value.outlet),
        i = r && n.value.component ? r.children : t,
        o = ti(n);
      for (let s of Object.values(o)) this.deactivateRouteAndItsChildren(s, i);
      r &&
        (r.outlet && (r.outlet.deactivate(), r.children.onOutletDeactivated()),
        (r.attachRef = null),
        (r.route = null));
    }
    activateChildRoutes(n, t, r) {
      let i = ti(t);
      n.children.forEach((o) => {
        this.activateRoutes(o, i[o.value.outlet], r),
          this.forwardEvent(new nf(o.value.snapshot));
      }),
        n.children.length && this.forwardEvent(new ef(n.value.snapshot));
    }
    activateRoutes(n, t, r) {
      let i = n.value,
        o = t ? t.value : null;
      if ((Bd(i), i === o))
        if (i.component) {
          let s = r.getOrCreateContext(i.outlet);
          this.activateChildRoutes(n, t, s.children);
        } else this.activateChildRoutes(n, t, r);
      else if (i.component) {
        let s = r.getOrCreateContext(i.outlet);
        if (this.routeReuseStrategy.shouldAttach(i.snapshot)) {
          let a = this.routeReuseStrategy.retrieve(i.snapshot);
          this.routeReuseStrategy.store(i.snapshot, null),
            s.children.onOutletReAttached(a.contexts),
            (s.attachRef = a.componentRef),
            (s.route = a.route.value),
            s.outlet && s.outlet.attach(a.componentRef, a.route.value),
            Bd(a.route.value),
            this.activateChildRoutes(n, null, s.children);
        } else
          (s.attachRef = null),
            (s.route = i),
            s.outlet && s.outlet.activateWith(i, s.injector),
            this.activateChildRoutes(n, null, s.children);
      } else this.activateChildRoutes(n, null, r);
    }
  },
  cl = class {
    path;
    route;
    constructor(n) {
      (this.path = n), (this.route = this.path[this.path.length - 1]);
    }
  },
  ii = class {
    component;
    route;
    constructor(n, t) {
      (this.component = n), (this.route = t);
    }
  };
function rM(e, n, t) {
  let r = e._root,
    i = n ? n._root : null;
  return to(r, i, t, [r.value]);
}
function iM(e) {
  let n = e.routeConfig ? e.routeConfig.canActivateChild : null;
  return !n || n.length === 0 ? null : { node: e, guards: n };
}
function ci(e, n) {
  let t = Symbol(),
    r = n.get(e, t);
  return r === t ? (typeof e == "function" && !Up(e) ? e : n.get(e)) : r;
}
function to(
  e,
  n,
  t,
  r,
  i = { canDeactivateChecks: [], canActivateChecks: [] }
) {
  let o = ti(n);
  return (
    e.children.forEach((s) => {
      oM(s, o[s.value.outlet], t, r.concat([s.value]), i),
        delete o[s.value.outlet];
    }),
    Object.entries(o).forEach(([s, a]) => oo(a, t.getContext(s), i)),
    i
  );
}
function oM(
  e,
  n,
  t,
  r,
  i = { canDeactivateChecks: [], canActivateChecks: [] }
) {
  let o = e.value,
    s = n ? n.value : null,
    a = t ? t.getContext(e.value.outlet) : null;
  if (s && o.routeConfig === s.routeConfig) {
    let l = sM(s, o, o.routeConfig.runGuardsAndResolvers);
    l
      ? i.canActivateChecks.push(new cl(r))
      : ((o.data = s.data), (o._resolvedData = s._resolvedData)),
      o.component ? to(e, n, a ? a.children : null, r, i) : to(e, n, t, r, i),
      l &&
        a &&
        a.outlet &&
        a.outlet.isActivated &&
        i.canDeactivateChecks.push(new ii(a.outlet.component, s));
  } else
    s && oo(n, a, i),
      i.canActivateChecks.push(new cl(r)),
      o.component
        ? to(e, null, a ? a.children : null, r, i)
        : to(e, null, t, r, i);
  return i;
}
function sM(e, n, t) {
  if (typeof t == "function") return t(e, n);
  switch (t) {
    case "pathParamsChange":
      return !sr(e.url, n.url);
    case "pathParamsOrQueryParamsChange":
      return !sr(e.url, n.url) || !Lt(e.queryParams, n.queryParams);
    case "always":
      return !0;
    case "paramsOrQueryParamsChange":
      return !af(e, n) || !Lt(e.queryParams, n.queryParams);
    case "paramsChange":
    default:
      return !af(e, n);
  }
}
function oo(e, n, t) {
  let r = ti(e),
    i = e.value;
  Object.entries(r).forEach(([o, s]) => {
    i.component
      ? n
        ? oo(s, n.children.getContext(o), t)
        : oo(s, null, t)
      : oo(s, n, t);
  }),
    i.component
      ? n && n.outlet && n.outlet.isActivated
        ? t.canDeactivateChecks.push(new ii(n.outlet.component, i))
        : t.canDeactivateChecks.push(new ii(null, i))
      : t.canDeactivateChecks.push(new ii(null, i));
}
function vo(e) {
  return typeof e == "function";
}
function aM(e) {
  return typeof e == "boolean";
}
function lM(e) {
  return e && vo(e.canLoad);
}
function cM(e) {
  return e && vo(e.canActivate);
}
function uM(e) {
  return e && vo(e.canActivateChild);
}
function dM(e) {
  return e && vo(e.canDeactivate);
}
function fM(e) {
  return e && vo(e.canMatch);
}
function Iv(e) {
  return e instanceof zt || e?.name === "EmptyError";
}
var Za = Symbol("INITIAL_VALUE");
function li() {
  return Be((e) =>
    bi(e.map((n) => n.pipe(qt(1), vc(Za)))).pipe(
      L((n) => {
        for (let t of n)
          if (t !== !0) {
            if (t === Za) return Za;
            if (t === !1 || hM(t)) return t;
          }
        return !0;
      }),
      je((n) => n !== Za),
      qt(1)
    )
  );
}
function hM(e) {
  return ar(e) || e instanceof uo;
}
function pM(e, n) {
  return ve((t) => {
    let {
      targetSnapshot: r,
      currentSnapshot: i,
      guards: { canActivateChecks: o, canDeactivateChecks: s },
    } = t;
    return s.length === 0 && o.length === 0
      ? P(q(w({}, t), { guardsResult: !0 }))
      : gM(s, r, i, e).pipe(
          ve((a) => (a && aM(a) ? mM(r, o, e, n) : P(a))),
          L((a) => q(w({}, t), { guardsResult: a }))
        );
  });
}
function gM(e, n, t, r) {
  return ae(e).pipe(
    ve((i) => EM(i.component, i.route, t, n, r)),
    St((i) => i !== !0, !0)
  );
}
function mM(e, n, t, r) {
  return ae(n).pipe(
    Gt((i) =>
      br(
        vM(i.route.parent, r),
        yM(i.route, r),
        _M(e, i.path, t),
        DM(e, i.route, t)
      )
    ),
    St((i) => i !== !0, !0)
  );
}
function yM(e, n) {
  return e !== null && n && n(new tf(e)), P(!0);
}
function vM(e, n) {
  return e !== null && n && n(new Xd(e)), P(!0);
}
function DM(e, n, t) {
  let r = n.routeConfig ? n.routeConfig.canActivate : null;
  if (!r || r.length === 0) return P(!0);
  let i = r.map((o) =>
    fs(() => {
      let s = mo(n) ?? t,
        a = ci(o, s),
        l = cM(a) ? a.canActivate(n, e) : $e(s, () => a(n, e));
      return Fn(l).pipe(St());
    })
  );
  return P(i).pipe(li());
}
function _M(e, n, t) {
  let r = n[n.length - 1],
    o = n
      .slice(0, n.length - 1)
      .reverse()
      .map((s) => iM(s))
      .filter((s) => s !== null)
      .map((s) =>
        fs(() => {
          let a = s.guards.map((l) => {
            let c = mo(s.node) ?? t,
              u = ci(l, c),
              d = uM(u) ? u.canActivateChild(r, e) : $e(c, () => u(r, e));
            return Fn(d).pipe(St());
          });
          return P(a).pipe(li());
        })
      );
  return P(o).pipe(li());
}
function EM(e, n, t, r, i) {
  let o = n && n.routeConfig ? n.routeConfig.canDeactivate : null;
  if (!o || o.length === 0) return P(!0);
  let s = o.map((a) => {
    let l = mo(n) ?? i,
      c = ci(a, l),
      u = dM(c) ? c.canDeactivate(e, n, t, r) : $e(l, () => c(e, n, t, r));
    return Fn(u).pipe(St());
  });
  return P(s).pipe(li());
}
function wM(e, n, t, r) {
  let i = n.canLoad;
  if (i === void 0 || i.length === 0) return P(!0);
  let o = i.map((s) => {
    let a = ci(s, e),
      l = lM(a) ? a.canLoad(n, t) : $e(e, () => a(n, t));
    return Fn(l);
  });
  return P(o).pipe(li(), Sv(r));
}
function Sv(e) {
  return cc(
    be((n) => {
      if (typeof n != "boolean") throw ll(e, n);
    }),
    L((n) => n === !0)
  );
}
function CM(e, n, t, r) {
  let i = n.canMatch;
  if (!i || i.length === 0) return P(!0);
  let o = i.map((s) => {
    let a = ci(s, e),
      l = fM(a) ? a.canMatch(n, t) : $e(e, () => a(n, t));
    return Fn(l);
  });
  return P(o).pipe(li(), Sv(r));
}
var fo = class {
    segmentGroup;
    constructor(n) {
      this.segmentGroup = n || null;
    }
  },
  ho = class extends Error {
    urlTree;
    constructor(n) {
      super(), (this.urlTree = n);
    }
  };
function ei(e) {
  return wr(new fo(e));
}
function bM(e) {
  return wr(new D(4e3, !1));
}
function IM(e) {
  return wr(Cv(!1, et.GuardRejected));
}
var uf = class {
    urlSerializer;
    urlTree;
    constructor(n, t) {
      (this.urlSerializer = n), (this.urlTree = t);
    }
    lineralizeSegments(n, t) {
      let r = [],
        i = t.root;
      for (;;) {
        if (((r = r.concat(i.segments)), i.numberOfChildren === 0)) return P(r);
        if (i.numberOfChildren > 1 || !i.children[B])
          return bM(`${n.redirectTo}`);
        i = i.children[B];
      }
    }
    applyRedirectCommands(n, t, r, i, o) {
      if (typeof t != "string") {
        let a = t,
          {
            queryParams: l,
            fragment: c,
            routeConfig: u,
            url: d,
            outlet: h,
            params: f,
            data: m,
            title: y,
          } = i,
          E = $e(o, () =>
            a({
              params: f,
              data: m,
              queryParams: l,
              fragment: c,
              routeConfig: u,
              url: d,
              outlet: h,
              title: y,
            })
          );
        if (E instanceof cn) throw new ho(E);
        t = E;
      }
      let s = this.applyRedirectCreateUrlTree(
        t,
        this.urlSerializer.parse(t),
        n,
        r
      );
      if (t[0] === "/") throw new ho(s);
      return s;
    }
    applyRedirectCreateUrlTree(n, t, r, i) {
      let o = this.createSegmentGroup(n, t.root, r, i);
      return new cn(
        o,
        this.createQueryParams(t.queryParams, this.urlTree.queryParams),
        t.fragment
      );
    }
    createQueryParams(n, t) {
      let r = {};
      return (
        Object.entries(n).forEach(([i, o]) => {
          if (typeof o == "string" && o[0] === ":") {
            let a = o.substring(1);
            r[i] = t[a];
          } else r[i] = o;
        }),
        r
      );
    }
    createSegmentGroup(n, t, r, i) {
      let o = this.createSegments(n, t.segments, r, i),
        s = {};
      return (
        Object.entries(t.children).forEach(([a, l]) => {
          s[a] = this.createSegmentGroup(n, l, r, i);
        }),
        new te(o, s)
      );
    }
    createSegments(n, t, r, i) {
      return t.map((o) =>
        o.path[0] === ":" ? this.findPosParam(n, o, i) : this.findOrReturn(o, r)
      );
    }
    findPosParam(n, t, r) {
      let i = r[t.path.substring(1)];
      if (!i) throw new D(4001, !1);
      return i;
    }
    findOrReturn(n, t) {
      let r = 0;
      for (let i of t) {
        if (i.path === n.path) return t.splice(r), i;
        r++;
      }
      return n;
    }
  },
  df = {
    matched: !1,
    consumedSegments: [],
    remainingSegments: [],
    parameters: {},
    positionalParamSegments: {},
  };
function SM(e, n, t, r, i) {
  let o = Mv(e, n, t);
  return o.matched
    ? ((r = QS(n, r)),
      CM(r, n, t, i).pipe(L((s) => (s === !0 ? o : w({}, df)))))
    : P(o);
}
function Mv(e, n, t) {
  if (n.path === "**") return MM(t);
  if (n.path === "")
    return n.pathMatch === "full" && (e.hasChildren() || t.length > 0)
      ? w({}, df)
      : {
          matched: !0,
          consumedSegments: [],
          remainingSegments: t,
          parameters: {},
          positionalParamSegments: {},
        };
  let i = (n.matcher || wS)(t, e, n);
  if (!i) return w({}, df);
  let o = {};
  Object.entries(i.posParams ?? {}).forEach(([a, l]) => {
    o[a] = l.path;
  });
  let s =
    i.consumed.length > 0
      ? w(w({}, o), i.consumed[i.consumed.length - 1].parameters)
      : o;
  return {
    matched: !0,
    consumedSegments: i.consumed,
    remainingSegments: t.slice(i.consumed.length),
    parameters: s,
    positionalParamSegments: i.posParams ?? {},
  };
}
function MM(e) {
  return {
    matched: !0,
    parameters: e.length > 0 ? sv(e).parameters : {},
    consumedSegments: e,
    remainingSegments: [],
    positionalParamSegments: {},
  };
}
function ev(e, n, t, r) {
  return t.length > 0 && NM(e, t, r)
    ? {
        segmentGroup: new te(n, AM(r, new te(t, e.children))),
        slicedSegments: [],
      }
    : t.length === 0 && xM(e, t, r)
    ? {
        segmentGroup: new te(e.segments, TM(e, t, r, e.children)),
        slicedSegments: t,
      }
    : { segmentGroup: new te(e.segments, e.children), slicedSegments: t };
}
function TM(e, n, t, r) {
  let i = {};
  for (let o of t)
    if (hl(e, n, o) && !r[_t(o)]) {
      let s = new te([], {});
      i[_t(o)] = s;
    }
  return w(w({}, r), i);
}
function AM(e, n) {
  let t = {};
  t[B] = n;
  for (let r of e)
    if (r.path === "" && _t(r) !== B) {
      let i = new te([], {});
      t[_t(r)] = i;
    }
  return t;
}
function NM(e, n, t) {
  return t.some((r) => hl(e, n, r) && _t(r) !== B);
}
function xM(e, n, t) {
  return t.some((r) => hl(e, n, r));
}
function hl(e, n, t) {
  return (e.hasChildren() || n.length > 0) && t.pathMatch === "full"
    ? !1
    : t.path === "";
}
function RM(e, n, t) {
  return n.length === 0 && !e.children[t];
}
var ff = class {};
function PM(e, n, t, r, i, o, s = "emptyOnly") {
  return new hf(e, n, t, r, i, s, o).recognize();
}
var OM = 31,
  hf = class {
    injector;
    configLoader;
    rootComponentType;
    config;
    urlTree;
    paramsInheritanceStrategy;
    urlSerializer;
    applyRedirects;
    absoluteRedirectCount = 0;
    allowRedirects = !0;
    constructor(n, t, r, i, o, s, a) {
      (this.injector = n),
        (this.configLoader = t),
        (this.rootComponentType = r),
        (this.config = i),
        (this.urlTree = o),
        (this.paramsInheritanceStrategy = s),
        (this.urlSerializer = a),
        (this.applyRedirects = new uf(this.urlSerializer, this.urlTree));
    }
    noMatchError(n) {
      return new D(4002, `'${n.segmentGroup}'`);
    }
    recognize() {
      let n = ev(this.urlTree.root, [], [], this.config).segmentGroup;
      return this.match(n).pipe(
        L(({ children: t, rootSnapshot: r }) => {
          let i = new Xe(r, t),
            o = new al("", i),
            s = US(r, [], this.urlTree.queryParams, this.urlTree.fragment);
          return (
            (s.queryParams = this.urlTree.queryParams),
            (o.url = this.urlSerializer.serialize(s)),
            { state: o, tree: s }
          );
        })
      );
    }
    match(n) {
      let t = new ri(
        [],
        Object.freeze({}),
        Object.freeze(w({}, this.urlTree.queryParams)),
        this.urlTree.fragment,
        Object.freeze({}),
        B,
        this.rootComponentType,
        null,
        {}
      );
      return this.processSegmentGroup(this.injector, this.config, n, B, t).pipe(
        L((r) => ({ children: r, rootSnapshot: t })),
        pn((r) => {
          if (r instanceof ho)
            return (this.urlTree = r.urlTree), this.match(r.urlTree.root);
          throw r instanceof fo ? this.noMatchError(r) : r;
        })
      );
    }
    processSegmentGroup(n, t, r, i, o) {
      return r.segments.length === 0 && r.hasChildren()
        ? this.processChildren(n, t, r, o)
        : this.processSegment(n, t, r, r.segments, i, !0, o).pipe(
            L((s) => (s instanceof Xe ? [s] : []))
          );
    }
    processChildren(n, t, r, i) {
      let o = [];
      for (let s of Object.keys(r.children))
        s === "primary" ? o.unshift(s) : o.push(s);
      return ae(o).pipe(
        Gt((s) => {
          let a = r.children[s],
            l = ZS(t, s);
          return this.processSegmentGroup(n, l, a, s, i);
        }),
        yc((s, a) => (s.push(...a), s)),
        gn(null),
        mc(),
        ve((s) => {
          if (s === null) return ei(r);
          let a = Tv(s);
          return FM(a), P(a);
        })
      );
    }
    processSegment(n, t, r, i, o, s, a) {
      return ae(t).pipe(
        Gt((l) =>
          this.processSegmentAgainstRoute(
            l._injector ?? n,
            t,
            l,
            r,
            i,
            o,
            s,
            a
          ).pipe(
            pn((c) => {
              if (c instanceof fo) return P(null);
              throw c;
            })
          )
        ),
        St((l) => !!l),
        pn((l) => {
          if (Iv(l)) return RM(r, i, o) ? P(new ff()) : ei(r);
          throw l;
        })
      );
    }
    processSegmentAgainstRoute(n, t, r, i, o, s, a, l) {
      return _t(r) !== s && (s === B || !hl(i, o, r))
        ? ei(i)
        : r.redirectTo === void 0
        ? this.matchSegmentAgainstRoute(n, i, r, o, s, l)
        : this.allowRedirects && a
        ? this.expandSegmentAgainstRouteUsingRedirect(n, i, t, r, o, s, l)
        : ei(i);
    }
    expandSegmentAgainstRouteUsingRedirect(n, t, r, i, o, s, a) {
      let {
        matched: l,
        parameters: c,
        consumedSegments: u,
        positionalParamSegments: d,
        remainingSegments: h,
      } = Mv(t, i, o);
      if (!l) return ei(t);
      typeof i.redirectTo == "string" &&
        i.redirectTo[0] === "/" &&
        (this.absoluteRedirectCount++,
        this.absoluteRedirectCount > OM && (this.allowRedirects = !1));
      let f = new ri(
          o,
          c,
          Object.freeze(w({}, this.urlTree.queryParams)),
          this.urlTree.fragment,
          tv(i),
          _t(i),
          i.component ?? i._loadedComponent ?? null,
          i,
          nv(i)
        ),
        m = sl(f, a, this.paramsInheritanceStrategy);
      (f.params = Object.freeze(m.params)), (f.data = Object.freeze(m.data));
      let y = this.applyRedirects.applyRedirectCommands(
        u,
        i.redirectTo,
        d,
        f,
        n
      );
      return this.applyRedirects
        .lineralizeSegments(i, y)
        .pipe(ve((E) => this.processSegment(n, r, t, E.concat(h), s, !1, a)));
    }
    matchSegmentAgainstRoute(n, t, r, i, o, s) {
      let a = SM(t, r, i, n, this.urlSerializer);
      return (
        r.path === "**" && (t.children = {}),
        a.pipe(
          Be((l) =>
            l.matched
              ? ((n = r._injector ?? n),
                this.getChildConfig(n, r, i).pipe(
                  Be(({ routes: c }) => {
                    let u = r._loadedInjector ?? n,
                      {
                        parameters: d,
                        consumedSegments: h,
                        remainingSegments: f,
                      } = l,
                      m = new ri(
                        h,
                        d,
                        Object.freeze(w({}, this.urlTree.queryParams)),
                        this.urlTree.fragment,
                        tv(r),
                        _t(r),
                        r.component ?? r._loadedComponent ?? null,
                        r,
                        nv(r)
                      ),
                      y = sl(m, s, this.paramsInheritanceStrategy);
                    (m.params = Object.freeze(y.params)),
                      (m.data = Object.freeze(y.data));
                    let { segmentGroup: E, slicedSegments: S } = ev(t, h, f, c);
                    if (S.length === 0 && E.hasChildren())
                      return this.processChildren(u, c, E, m).pipe(
                        L((x) => new Xe(m, x))
                      );
                    if (c.length === 0 && S.length === 0)
                      return P(new Xe(m, []));
                    let O = _t(r) === o;
                    return this.processSegment(
                      u,
                      c,
                      E,
                      S,
                      O ? B : o,
                      !0,
                      m
                    ).pipe(L((x) => new Xe(m, x instanceof Xe ? [x] : [])));
                  })
                ))
              : ei(t)
          )
        )
      );
    }
    getChildConfig(n, t, r) {
      return t.children
        ? P({ routes: t.children, injector: n })
        : t.loadChildren
        ? t._loadedRoutes !== void 0
          ? P({ routes: t._loadedRoutes, injector: t._loadedInjector })
          : wM(n, t, r, this.urlSerializer).pipe(
              ve((i) =>
                i
                  ? this.configLoader.loadChildren(n, t).pipe(
                      be((o) => {
                        (t._loadedRoutes = o.routes),
                          (t._loadedInjector = o.injector);
                      })
                    )
                  : IM(t)
              )
            )
        : P({ routes: [], injector: n });
    }
  };
function FM(e) {
  e.sort((n, t) =>
    n.value.outlet === B
      ? -1
      : t.value.outlet === B
      ? 1
      : n.value.outlet.localeCompare(t.value.outlet)
  );
}
function kM(e) {
  let n = e.value.routeConfig;
  return n && n.path === "";
}
function Tv(e) {
  let n = [],
    t = new Set();
  for (let r of e) {
    if (!kM(r)) {
      n.push(r);
      continue;
    }
    let i = n.find((o) => r.value.routeConfig === o.value.routeConfig);
    i !== void 0 ? (i.children.push(...r.children), t.add(i)) : n.push(r);
  }
  for (let r of t) {
    let i = Tv(r.children);
    n.push(new Xe(r.value, i));
  }
  return n.filter((r) => !t.has(r));
}
function tv(e) {
  return e.data || {};
}
function nv(e) {
  return e.resolve || {};
}
function LM(e, n, t, r, i, o) {
  return ve((s) =>
    PM(e, n, t, r, s.extractedUrl, i, o).pipe(
      L(({ state: a, tree: l }) =>
        q(w({}, s), { targetSnapshot: a, urlAfterRedirects: l })
      )
    )
  );
}
function VM(e, n) {
  return ve((t) => {
    let {
      targetSnapshot: r,
      guards: { canActivateChecks: i },
    } = t;
    if (!i.length) return P(t);
    let o = new Set(i.map((l) => l.route)),
      s = new Set();
    for (let l of o) if (!s.has(l)) for (let c of Av(l)) s.add(c);
    let a = 0;
    return ae(s).pipe(
      Gt((l) =>
        o.has(l)
          ? jM(l, r, e, n)
          : ((l.data = sl(l, l.parent, e).resolve), P(void 0))
      ),
      be(() => a++),
      Ir(1),
      ve((l) => (a === s.size ? P(t) : Ze))
    );
  });
}
function Av(e) {
  let n = e.children.map((t) => Av(t)).flat();
  return [e, ...n];
}
function jM(e, n, t, r) {
  let i = e.routeConfig,
    o = e._resolve;
  return (
    i?.title !== void 0 && !Ev(i) && (o[po] = i.title),
    BM(o, e, n, r).pipe(
      L(
        (s) => (
          (e._resolvedData = s), (e.data = sl(e, e.parent, t).resolve), null
        )
      )
    )
  );
}
function BM(e, n, t, r) {
  let i = Hd(e);
  if (i.length === 0) return P({});
  let o = {};
  return ae(i).pipe(
    ve((s) =>
      UM(e[s], n, t, r).pipe(
        St(),
        be((a) => {
          if (a instanceof uo) throw ll(new si(), a);
          o[s] = a;
        })
      )
    ),
    Ir(1),
    gc(o),
    pn((s) => (Iv(s) ? Ze : wr(s)))
  );
}
function UM(e, n, t, r) {
  let i = mo(n) ?? r,
    o = ci(e, i),
    s = o.resolve ? o.resolve(n, t) : $e(i, () => o(n, t));
  return Fn(s);
}
function Ud(e) {
  return Be((n) => {
    let t = e(n);
    return t ? ae(t).pipe(L(() => n)) : P(n);
  });
}
var Nv = (() => {
    class e {
      buildTitle(t) {
        let r,
          i = t.root;
        for (; i !== void 0; )
          (r = this.getResolvedTitleForRoute(i) ?? r),
            (i = i.children.find((o) => o.outlet === B));
        return r;
      }
      getResolvedTitleForRoute(t) {
        return t.data[po];
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = b({ token: e, factory: () => v($M), providedIn: "root" });
    }
    return e;
  })(),
  $M = (() => {
    class e extends Nv {
      title;
      constructor(t) {
        super(), (this.title = t);
      }
      updateTitle(t) {
        let r = this.buildTitle(t);
        r !== void 0 && this.title.setTitle(r);
      }
      static ɵfac = function (r) {
        return new (r || e)(M(Wy));
      };
      static ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })(),
  Do = new I("", { providedIn: "root", factory: () => ({}) }),
  HM = (() => {
    class e {
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵcmp = J({
        type: e,
        selectors: [["ng-component"]],
        decls: 1,
        vars: 0,
        template: function (r, i) {
          r & 1 && V(0, "router-outlet");
        },
        dependencies: [mf],
        encapsulation: 2,
      });
    }
    return e;
  })();
function yf(e) {
  let n = e.children && e.children.map(yf),
    t = n ? q(w({}, e), { children: n }) : w({}, e);
  return (
    !t.component &&
      !t.loadComponent &&
      (n || t.loadChildren) &&
      t.outlet &&
      t.outlet !== B &&
      (t.component = HM),
    t
  );
}
var ul = new I(""),
  vf = (() => {
    class e {
      componentLoaders = new WeakMap();
      childrenLoaders = new WeakMap();
      onLoadStartListener;
      onLoadEndListener;
      compiler = v(Pa);
      loadComponent(t) {
        if (this.componentLoaders.get(t)) return this.componentLoaders.get(t);
        if (t._loadedComponent) return P(t._loadedComponent);
        this.onLoadStartListener && this.onLoadStartListener(t);
        let r = Fn(t.loadComponent()).pipe(
            L(xv),
            be((o) => {
              this.onLoadEndListener && this.onLoadEndListener(t),
                (t._loadedComponent = o);
            }),
            mn(() => {
              this.componentLoaders.delete(t);
            })
          ),
          i = new Er(r, () => new Ee()).pipe(_r());
        return this.componentLoaders.set(t, i), i;
      }
      loadChildren(t, r) {
        if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
        if (r._loadedRoutes)
          return P({ routes: r._loadedRoutes, injector: r._loadedInjector });
        this.onLoadStartListener && this.onLoadStartListener(r);
        let o = zM(r, this.compiler, t, this.onLoadEndListener).pipe(
            mn(() => {
              this.childrenLoaders.delete(r);
            })
          ),
          s = new Er(o, () => new Ee()).pipe(_r());
        return this.childrenLoaders.set(r, s), s;
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })();
function zM(e, n, t, r) {
  return Fn(e.loadChildren()).pipe(
    L(xv),
    ve((i) =>
      i instanceof Pi || Array.isArray(i) ? P(i) : ae(n.compileModuleAsync(i))
    ),
    L((i) => {
      r && r(e);
      let o,
        s,
        a = !1;
      return (
        Array.isArray(i)
          ? ((s = i), (a = !0))
          : ((o = i.create(t).injector),
            (s = o.get(ul, [], { optional: !0, self: !0 }).flat())),
        { routes: s.map(yf), injector: o }
      );
    })
  );
}
function GM(e) {
  return e && typeof e == "object" && "default" in e;
}
function xv(e) {
  return GM(e) ? e.default : e;
}
var Df = (() => {
    class e {
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = b({ token: e, factory: () => v(qM), providedIn: "root" });
    }
    return e;
  })(),
  qM = (() => {
    class e {
      shouldProcessUrl(t) {
        return !0;
      }
      extract(t) {
        return t;
      }
      merge(t, r) {
        return t;
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })(),
  Rv = new I(""),
  Pv = new I("");
function WM(e, n, t) {
  let r = e.get(Pv),
    i = e.get(Me);
  return e.get(ee).runOutsideAngular(() => {
    if (!i.startViewTransition || r.skipNextTransition)
      return (r.skipNextTransition = !1), new Promise((c) => setTimeout(c));
    let o,
      s = new Promise((c) => {
        o = c;
      }),
      a = i.startViewTransition(() => (o(), QM(e))),
      { onViewTransitionCreated: l } = r;
    return l && $e(e, () => l({ transition: a, from: n, to: t })), s;
  });
}
function QM(e) {
  return new Promise((n) => {
    qu({ read: () => setTimeout(n) }, { injector: e });
  });
}
var Ov = new I(""),
  _f = (() => {
    class e {
      currentNavigation = null;
      currentTransition = null;
      lastSuccessfulNavigation = null;
      events = new Ee();
      transitionAbortSubject = new Ee();
      configLoader = v(vf);
      environmentInjector = v(Oe);
      urlSerializer = v(go);
      rootContexts = v(yo);
      location = v(Jr);
      inputBindingEnabled = v(fl, { optional: !0 }) !== null;
      titleStrategy = v(Nv);
      options = v(Do, { optional: !0 }) || {};
      paramsInheritanceStrategy =
        this.options.paramsInheritanceStrategy || "emptyOnly";
      urlHandlingStrategy = v(Df);
      createViewTransition = v(Rv, { optional: !0 });
      navigationErrorHandler = v(Ov, { optional: !0 });
      navigationId = 0;
      get hasRequestedNavigation() {
        return this.navigationId !== 0;
      }
      transitions;
      afterPreactivation = () => P(void 0);
      rootComponentType = null;
      constructor() {
        let t = (i) => this.events.next(new Yd(i)),
          r = (i) => this.events.next(new Jd(i));
        (this.configLoader.onLoadEndListener = r),
          (this.configLoader.onLoadStartListener = t);
      }
      complete() {
        this.transitions?.complete();
      }
      handleNavigationRequest(t) {
        let r = ++this.navigationId;
        this.transitions?.next(
          q(w(w({}, this.transitions.value), t), { id: r })
        );
      }
      setupNavigations(t, r, i) {
        return (
          (this.transitions = new Ae({
            id: 0,
            currentUrlTree: r,
            currentRawUrl: r,
            extractedUrl: this.urlHandlingStrategy.extract(r),
            urlAfterRedirects: this.urlHandlingStrategy.extract(r),
            rawUrl: r,
            extras: {},
            resolve: () => {},
            reject: () => {},
            promise: Promise.resolve(!0),
            source: io,
            restoredState: null,
            currentSnapshot: i.snapshot,
            targetSnapshot: null,
            currentRouterState: i,
            targetRouterState: null,
            guards: { canActivateChecks: [], canDeactivateChecks: [] },
            guardsResult: null,
          })),
          this.transitions.pipe(
            je((o) => o.id !== 0),
            L((o) =>
              q(w({}, o), {
                extractedUrl: this.urlHandlingStrategy.extract(o.rawUrl),
              })
            ),
            Be((o) => {
              let s = !1,
                a = !1;
              return P(o).pipe(
                Be((l) => {
                  if (this.navigationId > o.id)
                    return (
                      this.cancelNavigationTransition(
                        o,
                        "",
                        et.SupersededByNewNavigation
                      ),
                      Ze
                    );
                  (this.currentTransition = o),
                    (this.currentNavigation = {
                      id: l.id,
                      initialUrl: l.rawUrl,
                      extractedUrl: l.extractedUrl,
                      targetBrowserUrl:
                        typeof l.extras.browserUrl == "string"
                          ? this.urlSerializer.parse(l.extras.browserUrl)
                          : l.extras.browserUrl,
                      trigger: l.source,
                      extras: l.extras,
                      previousNavigation: this.lastSuccessfulNavigation
                        ? q(w({}, this.lastSuccessfulNavigation), {
                            previousNavigation: null,
                          })
                        : null,
                    });
                  let c =
                      !t.navigated ||
                      this.isUpdatingInternalState() ||
                      this.isUpdatedBrowserUrl(),
                    u = l.extras.onSameUrlNavigation ?? t.onSameUrlNavigation;
                  if (!c && u !== "reload") {
                    let d = "";
                    return (
                      this.events.next(
                        new On(
                          l.id,
                          this.urlSerializer.serialize(l.rawUrl),
                          d,
                          tl.IgnoredSameUrlNavigation
                        )
                      ),
                      l.resolve(!1),
                      Ze
                    );
                  }
                  if (this.urlHandlingStrategy.shouldProcessUrl(l.rawUrl))
                    return P(l).pipe(
                      Be((d) => {
                        let h = this.transitions?.getValue();
                        return (
                          this.events.next(
                            new Pn(
                              d.id,
                              this.urlSerializer.serialize(d.extractedUrl),
                              d.source,
                              d.restoredState
                            )
                          ),
                          h !== this.transitions?.getValue()
                            ? Ze
                            : Promise.resolve(d)
                        );
                      }),
                      LM(
                        this.environmentInjector,
                        this.configLoader,
                        this.rootComponentType,
                        t.config,
                        this.urlSerializer,
                        this.paramsInheritanceStrategy
                      ),
                      be((d) => {
                        (o.targetSnapshot = d.targetSnapshot),
                          (o.urlAfterRedirects = d.urlAfterRedirects),
                          (this.currentNavigation = q(
                            w({}, this.currentNavigation),
                            { finalUrl: d.urlAfterRedirects }
                          ));
                        let h = new nl(
                          d.id,
                          this.urlSerializer.serialize(d.extractedUrl),
                          this.urlSerializer.serialize(d.urlAfterRedirects),
                          d.targetSnapshot
                        );
                        this.events.next(h);
                      })
                    );
                  if (
                    c &&
                    this.urlHandlingStrategy.shouldProcessUrl(l.currentRawUrl)
                  ) {
                    let {
                        id: d,
                        extractedUrl: h,
                        source: f,
                        restoredState: m,
                        extras: y,
                      } = l,
                      E = new Pn(d, this.urlSerializer.serialize(h), f, m);
                    this.events.next(E);
                    let S = Dv(this.rootComponentType).snapshot;
                    return (
                      (this.currentTransition = o =
                        q(w({}, l), {
                          targetSnapshot: S,
                          urlAfterRedirects: h,
                          extras: q(w({}, y), {
                            skipLocationChange: !1,
                            replaceUrl: !1,
                          }),
                        })),
                      (this.currentNavigation.finalUrl = h),
                      P(o)
                    );
                  } else {
                    let d = "";
                    return (
                      this.events.next(
                        new On(
                          l.id,
                          this.urlSerializer.serialize(l.extractedUrl),
                          d,
                          tl.IgnoredByUrlHandlingStrategy
                        )
                      ),
                      l.resolve(!1),
                      Ze
                    );
                  }
                }),
                be((l) => {
                  let c = new Wd(
                    l.id,
                    this.urlSerializer.serialize(l.extractedUrl),
                    this.urlSerializer.serialize(l.urlAfterRedirects),
                    l.targetSnapshot
                  );
                  this.events.next(c);
                }),
                L(
                  (l) => (
                    (this.currentTransition = o =
                      q(w({}, l), {
                        guards: rM(
                          l.targetSnapshot,
                          l.currentSnapshot,
                          this.rootContexts
                        ),
                      })),
                    o
                  )
                ),
                pM(this.environmentInjector, (l) => this.events.next(l)),
                be((l) => {
                  if (
                    ((o.guardsResult = l.guardsResult),
                    l.guardsResult && typeof l.guardsResult != "boolean")
                  )
                    throw ll(this.urlSerializer, l.guardsResult);
                  let c = new Qd(
                    l.id,
                    this.urlSerializer.serialize(l.extractedUrl),
                    this.urlSerializer.serialize(l.urlAfterRedirects),
                    l.targetSnapshot,
                    !!l.guardsResult
                  );
                  this.events.next(c);
                }),
                je((l) =>
                  l.guardsResult
                    ? !0
                    : (this.cancelNavigationTransition(l, "", et.GuardRejected),
                      !1)
                ),
                Ud((l) => {
                  if (l.guards.canActivateChecks.length)
                    return P(l).pipe(
                      be((c) => {
                        let u = new Zd(
                          c.id,
                          this.urlSerializer.serialize(c.extractedUrl),
                          this.urlSerializer.serialize(c.urlAfterRedirects),
                          c.targetSnapshot
                        );
                        this.events.next(u);
                      }),
                      Be((c) => {
                        let u = !1;
                        return P(c).pipe(
                          VM(
                            this.paramsInheritanceStrategy,
                            this.environmentInjector
                          ),
                          be({
                            next: () => (u = !0),
                            complete: () => {
                              u ||
                                this.cancelNavigationTransition(
                                  c,
                                  "",
                                  et.NoDataFromResolver
                                );
                            },
                          })
                        );
                      }),
                      be((c) => {
                        let u = new Kd(
                          c.id,
                          this.urlSerializer.serialize(c.extractedUrl),
                          this.urlSerializer.serialize(c.urlAfterRedirects),
                          c.targetSnapshot
                        );
                        this.events.next(u);
                      })
                    );
                }),
                Ud((l) => {
                  let c = (u) => {
                    let d = [];
                    u.routeConfig?.loadComponent &&
                      !u.routeConfig._loadedComponent &&
                      d.push(
                        this.configLoader.loadComponent(u.routeConfig).pipe(
                          be((h) => {
                            u.component = h;
                          }),
                          L(() => {})
                        )
                      );
                    for (let h of u.children) d.push(...c(h));
                    return d;
                  };
                  return bi(c(l.targetSnapshot.root)).pipe(gn(null), qt(1));
                }),
                Ud(() => this.afterPreactivation()),
                Be(() => {
                  let { currentSnapshot: l, targetSnapshot: c } = o,
                    u = this.createViewTransition?.(
                      this.environmentInjector,
                      l.root,
                      c.root
                    );
                  return u ? ae(u).pipe(L(() => o)) : P(o);
                }),
                L((l) => {
                  let c = JS(
                    t.routeReuseStrategy,
                    l.targetSnapshot,
                    l.currentRouterState
                  );
                  return (
                    (this.currentTransition = o =
                      q(w({}, l), { targetRouterState: c })),
                    (this.currentNavigation.targetRouterState = c),
                    o
                  );
                }),
                be(() => {
                  this.events.next(new lo());
                }),
                nM(
                  this.rootContexts,
                  t.routeReuseStrategy,
                  (l) => this.events.next(l),
                  this.inputBindingEnabled
                ),
                qt(1),
                be({
                  next: (l) => {
                    (s = !0),
                      (this.lastSuccessfulNavigation = this.currentNavigation),
                      this.events.next(
                        new ut(
                          l.id,
                          this.urlSerializer.serialize(l.extractedUrl),
                          this.urlSerializer.serialize(l.urlAfterRedirects)
                        )
                      ),
                      this.titleStrategy?.updateTitle(
                        l.targetRouterState.snapshot
                      ),
                      l.resolve(!0);
                  },
                  complete: () => {
                    s = !0;
                  },
                }),
                Dc(
                  this.transitionAbortSubject.pipe(
                    be((l) => {
                      throw l;
                    })
                  )
                ),
                mn(() => {
                  !s &&
                    !a &&
                    this.cancelNavigationTransition(
                      o,
                      "",
                      et.SupersededByNewNavigation
                    ),
                    this.currentTransition?.id === o.id &&
                      ((this.currentNavigation = null),
                      (this.currentTransition = null));
                }),
                pn((l) => {
                  if (((a = !0), bv(l)))
                    this.events.next(
                      new ln(
                        o.id,
                        this.urlSerializer.serialize(o.extractedUrl),
                        l.message,
                        l.cancellationCode
                      )
                    ),
                      tM(l)
                        ? this.events.next(
                            new ai(l.url, l.navigationBehaviorOptions)
                          )
                        : o.resolve(!1);
                  else {
                    let c = new ao(
                      o.id,
                      this.urlSerializer.serialize(o.extractedUrl),
                      l,
                      o.targetSnapshot ?? void 0
                    );
                    try {
                      let u = $e(this.environmentInjector, () =>
                        this.navigationErrorHandler?.(c)
                      );
                      if (u instanceof uo) {
                        let { message: d, cancellationCode: h } = ll(
                          this.urlSerializer,
                          u
                        );
                        this.events.next(
                          new ln(
                            o.id,
                            this.urlSerializer.serialize(o.extractedUrl),
                            d,
                            h
                          )
                        ),
                          this.events.next(
                            new ai(u.redirectTo, u.navigationBehaviorOptions)
                          );
                      } else throw (this.events.next(c), l);
                    } catch (u) {
                      this.options.resolveNavigationPromiseOnError
                        ? o.resolve(!1)
                        : o.reject(u);
                    }
                  }
                  return Ze;
                })
              );
            })
          )
        );
      }
      cancelNavigationTransition(t, r, i) {
        let o = new ln(
          t.id,
          this.urlSerializer.serialize(t.extractedUrl),
          r,
          i
        );
        this.events.next(o), t.resolve(!1);
      }
      isUpdatingInternalState() {
        return (
          this.currentTransition?.extractedUrl.toString() !==
          this.currentTransition?.currentUrlTree.toString()
        );
      }
      isUpdatedBrowserUrl() {
        let t = this.urlHandlingStrategy.extract(
            this.urlSerializer.parse(this.location.path(!0))
          ),
          r =
            this.currentNavigation?.targetBrowserUrl ??
            this.currentNavigation?.extractedUrl;
        return (
          t.toString() !== r?.toString() &&
          !this.currentNavigation?.extras.skipLocationChange
        );
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })();
function ZM(e) {
  return e !== io;
}
var KM = (() => {
    class e {
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = b({ token: e, factory: () => v(YM), providedIn: "root" });
    }
    return e;
  })(),
  pf = class {
    shouldDetach(n) {
      return !1;
    }
    store(n, t) {}
    shouldAttach(n) {
      return !1;
    }
    retrieve(n) {
      return null;
    }
    shouldReuseRoute(n, t) {
      return n.routeConfig === t.routeConfig;
    }
  },
  YM = (() => {
    class e extends pf {
      static ɵfac = (() => {
        let t;
        return function (i) {
          return (t || (t = Yt(e)))(i || e);
        };
      })();
      static ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })(),
  Fv = (() => {
    class e {
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = b({ token: e, factory: () => v(JM), providedIn: "root" });
    }
    return e;
  })(),
  JM = (() => {
    class e extends Fv {
      location = v(Jr);
      urlSerializer = v(go);
      options = v(Do, { optional: !0 }) || {};
      canceledNavigationResolution =
        this.options.canceledNavigationResolution || "replace";
      urlHandlingStrategy = v(Df);
      urlUpdateStrategy = this.options.urlUpdateStrategy || "deferred";
      currentUrlTree = new cn();
      getCurrentUrlTree() {
        return this.currentUrlTree;
      }
      rawUrlTree = this.currentUrlTree;
      getRawUrlTree() {
        return this.rawUrlTree;
      }
      currentPageId = 0;
      lastSuccessfulId = -1;
      restoredState() {
        return this.location.getState();
      }
      get browserPageId() {
        return this.canceledNavigationResolution !== "computed"
          ? this.currentPageId
          : this.restoredState()?.ɵrouterPageId ?? this.currentPageId;
      }
      routerState = Dv(null);
      getRouterState() {
        return this.routerState;
      }
      stateMemento = this.createStateMemento();
      createStateMemento() {
        return {
          rawUrlTree: this.rawUrlTree,
          currentUrlTree: this.currentUrlTree,
          routerState: this.routerState,
        };
      }
      registerNonRouterCurrentEntryChangeListener(t) {
        return this.location.subscribe((r) => {
          r.type === "popstate" && t(r.url, r.state);
        });
      }
      handleRouterEvent(t, r) {
        if (t instanceof Pn) this.stateMemento = this.createStateMemento();
        else if (t instanceof On) this.rawUrlTree = r.initialUrl;
        else if (t instanceof nl) {
          if (
            this.urlUpdateStrategy === "eager" &&
            !r.extras.skipLocationChange
          ) {
            let i = this.urlHandlingStrategy.merge(r.finalUrl, r.initialUrl);
            this.setBrowserUrl(r.targetBrowserUrl ?? i, r);
          }
        } else
          t instanceof lo
            ? ((this.currentUrlTree = r.finalUrl),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                r.finalUrl,
                r.initialUrl
              )),
              (this.routerState = r.targetRouterState),
              this.urlUpdateStrategy === "deferred" &&
                !r.extras.skipLocationChange &&
                this.setBrowserUrl(r.targetBrowserUrl ?? this.rawUrlTree, r))
            : t instanceof ln &&
              (t.code === et.GuardRejected || t.code === et.NoDataFromResolver)
            ? this.restoreHistory(r)
            : t instanceof ao
            ? this.restoreHistory(r, !0)
            : t instanceof ut &&
              ((this.lastSuccessfulId = t.id),
              (this.currentPageId = this.browserPageId));
      }
      setBrowserUrl(t, r) {
        let i = t instanceof cn ? this.urlSerializer.serialize(t) : t;
        if (this.location.isCurrentPathEqualTo(i) || r.extras.replaceUrl) {
          let o = this.browserPageId,
            s = w(w({}, r.extras.state), this.generateNgRouterState(r.id, o));
          this.location.replaceState(i, "", s);
        } else {
          let o = w(
            w({}, r.extras.state),
            this.generateNgRouterState(r.id, this.browserPageId + 1)
          );
          this.location.go(i, "", o);
        }
      }
      restoreHistory(t, r = !1) {
        if (this.canceledNavigationResolution === "computed") {
          let i = this.browserPageId,
            o = this.currentPageId - i;
          o !== 0
            ? this.location.historyGo(o)
            : this.currentUrlTree === t.finalUrl &&
              o === 0 &&
              (this.resetState(t), this.resetUrlToCurrentUrlTree());
        } else
          this.canceledNavigationResolution === "replace" &&
            (r && this.resetState(t), this.resetUrlToCurrentUrlTree());
      }
      resetState(t) {
        (this.routerState = this.stateMemento.routerState),
          (this.currentUrlTree = this.stateMemento.currentUrlTree),
          (this.rawUrlTree = this.urlHandlingStrategy.merge(
            this.currentUrlTree,
            t.finalUrl ?? this.rawUrlTree
          ));
      }
      resetUrlToCurrentUrlTree() {
        this.location.replaceState(
          this.urlSerializer.serialize(this.rawUrlTree),
          "",
          this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId)
        );
      }
      generateNgRouterState(t, r) {
        return this.canceledNavigationResolution === "computed"
          ? { navigationId: t, ɵrouterPageId: r }
          : { navigationId: t };
      }
      static ɵfac = (() => {
        let t;
        return function (i) {
          return (t || (t = Yt(e)))(i || e);
        };
      })();
      static ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })(),
  no = (function (e) {
    return (
      (e[(e.COMPLETE = 0)] = "COMPLETE"),
      (e[(e.FAILED = 1)] = "FAILED"),
      (e[(e.REDIRECTING = 2)] = "REDIRECTING"),
      e
    );
  })(no || {});
function kv(e, n) {
  e.events
    .pipe(
      je(
        (t) =>
          t instanceof ut ||
          t instanceof ln ||
          t instanceof ao ||
          t instanceof On
      ),
      L((t) =>
        t instanceof ut || t instanceof On
          ? no.COMPLETE
          : (
              t instanceof ln
                ? t.code === et.Redirect ||
                  t.code === et.SupersededByNewNavigation
                : !1
            )
          ? no.REDIRECTING
          : no.FAILED
      ),
      je((t) => t !== no.REDIRECTING),
      qt(1)
    )
    .subscribe(() => {
      n();
    });
}
var XM = {
    paths: "exact",
    fragment: "ignored",
    matrixParams: "ignored",
    queryParams: "exact",
  },
  eT = {
    paths: "subset",
    fragment: "ignored",
    matrixParams: "ignored",
    queryParams: "subset",
  },
  ce = (() => {
    class e {
      get currentUrlTree() {
        return this.stateManager.getCurrentUrlTree();
      }
      get rawUrlTree() {
        return this.stateManager.getRawUrlTree();
      }
      disposed = !1;
      nonRouterCurrentEntryChangeSubscription;
      console = v(Ca);
      stateManager = v(Fv);
      options = v(Do, { optional: !0 }) || {};
      pendingTasks = v(Jt);
      urlUpdateStrategy = this.options.urlUpdateStrategy || "deferred";
      navigationTransitions = v(_f);
      urlSerializer = v(go);
      location = v(Jr);
      urlHandlingStrategy = v(Df);
      _events = new Ee();
      get events() {
        return this._events;
      }
      get routerState() {
        return this.stateManager.getRouterState();
      }
      navigated = !1;
      routeReuseStrategy = v(KM);
      onSameUrlNavigation = this.options.onSameUrlNavigation || "ignore";
      config = v(ul, { optional: !0 })?.flat() ?? [];
      componentInputBindingEnabled = !!v(fl, { optional: !0 });
      constructor() {
        this.resetConfig(this.config),
          this.navigationTransitions
            .setupNavigations(this, this.currentUrlTree, this.routerState)
            .subscribe({
              error: (t) => {
                this.console.warn(t);
              },
            }),
          this.subscribeToNavigationEvents();
      }
      eventsSubscription = new me();
      subscribeToNavigationEvents() {
        let t = this.navigationTransitions.events.subscribe((r) => {
          try {
            let i = this.navigationTransitions.currentTransition,
              o = this.navigationTransitions.currentNavigation;
            if (i !== null && o !== null) {
              if (
                (this.stateManager.handleRouterEvent(r, o),
                r instanceof ln &&
                  r.code !== et.Redirect &&
                  r.code !== et.SupersededByNewNavigation)
              )
                this.navigated = !0;
              else if (r instanceof ut) this.navigated = !0;
              else if (r instanceof ai) {
                let s = r.navigationBehaviorOptions,
                  a = this.urlHandlingStrategy.merge(r.url, i.currentRawUrl),
                  l = w(
                    {
                      browserUrl: i.extras.browserUrl,
                      info: i.extras.info,
                      skipLocationChange: i.extras.skipLocationChange,
                      replaceUrl:
                        i.extras.replaceUrl ||
                        this.urlUpdateStrategy === "eager" ||
                        ZM(i.source),
                    },
                    s
                  );
                this.scheduleNavigation(a, io, null, l, {
                  resolve: i.resolve,
                  reject: i.reject,
                  promise: i.promise,
                });
              }
            }
            nT(r) && this._events.next(r);
          } catch (i) {
            this.navigationTransitions.transitionAbortSubject.next(i);
          }
        });
        this.eventsSubscription.add(t);
      }
      resetRootComponentType(t) {
        (this.routerState.root.component = t),
          (this.navigationTransitions.rootComponentType = t);
      }
      initialNavigation() {
        this.setUpLocationChangeListener(),
          this.navigationTransitions.hasRequestedNavigation ||
            this.navigateToSyncWithBrowser(
              this.location.path(!0),
              io,
              this.stateManager.restoredState()
            );
      }
      setUpLocationChangeListener() {
        this.nonRouterCurrentEntryChangeSubscription ??=
          this.stateManager.registerNonRouterCurrentEntryChangeListener(
            (t, r) => {
              setTimeout(() => {
                this.navigateToSyncWithBrowser(t, "popstate", r);
              }, 0);
            }
          );
      }
      navigateToSyncWithBrowser(t, r, i) {
        let o = { replaceUrl: !0 },
          s = i?.navigationId ? i : null;
        if (i) {
          let l = w({}, i);
          delete l.navigationId,
            delete l.ɵrouterPageId,
            Object.keys(l).length !== 0 && (o.state = l);
        }
        let a = this.parseUrl(t);
        this.scheduleNavigation(a, r, s, o);
      }
      get url() {
        return this.serializeUrl(this.currentUrlTree);
      }
      getCurrentNavigation() {
        return this.navigationTransitions.currentNavigation;
      }
      get lastSuccessfulNavigation() {
        return this.navigationTransitions.lastSuccessfulNavigation;
      }
      resetConfig(t) {
        (this.config = t.map(yf)), (this.navigated = !1);
      }
      ngOnDestroy() {
        this.dispose();
      }
      dispose() {
        this.navigationTransitions.complete(),
          this.nonRouterCurrentEntryChangeSubscription &&
            (this.nonRouterCurrentEntryChangeSubscription.unsubscribe(),
            (this.nonRouterCurrentEntryChangeSubscription = void 0)),
          (this.disposed = !0),
          this.eventsSubscription.unsubscribe();
      }
      createUrlTree(t, r = {}) {
        let {
            relativeTo: i,
            queryParams: o,
            fragment: s,
            queryParamsHandling: a,
            preserveFragment: l,
          } = r,
          c = l ? this.currentUrlTree.fragment : s,
          u = null;
        switch (a ?? this.options.defaultQueryParamsHandling) {
          case "merge":
            u = w(w({}, this.currentUrlTree.queryParams), o);
            break;
          case "preserve":
            u = this.currentUrlTree.queryParams;
            break;
          default:
            u = o || null;
        }
        u !== null && (u = this.removeEmptyProps(u));
        let d;
        try {
          let h = i ? i.snapshot : this.routerState.snapshot.root;
          d = gv(h);
        } catch {
          (typeof t[0] != "string" || t[0][0] !== "/") && (t = []),
            (d = this.currentUrlTree.root);
        }
        return mv(d, t, u, c ?? null);
      }
      navigateByUrl(t, r = { skipLocationChange: !1 }) {
        let i = ar(t) ? t : this.parseUrl(t),
          o = this.urlHandlingStrategy.merge(i, this.rawUrlTree);
        return this.scheduleNavigation(o, io, null, r);
      }
      navigate(t, r = { skipLocationChange: !1 }) {
        return tT(t), this.navigateByUrl(this.createUrlTree(t, r), r);
      }
      serializeUrl(t) {
        return this.urlSerializer.serialize(t);
      }
      parseUrl(t) {
        try {
          return this.urlSerializer.parse(t);
        } catch {
          return this.urlSerializer.parse("/");
        }
      }
      isActive(t, r) {
        let i;
        if (
          (r === !0 ? (i = w({}, XM)) : r === !1 ? (i = w({}, eT)) : (i = r),
          ar(t))
        )
          return Zy(this.currentUrlTree, t, i);
        let o = this.parseUrl(t);
        return Zy(this.currentUrlTree, o, i);
      }
      removeEmptyProps(t) {
        return Object.entries(t).reduce(
          (r, [i, o]) => (o != null && (r[i] = o), r),
          {}
        );
      }
      scheduleNavigation(t, r, i, o, s) {
        if (this.disposed) return Promise.resolve(!1);
        let a, l, c;
        s
          ? ((a = s.resolve), (l = s.reject), (c = s.promise))
          : (c = new Promise((d, h) => {
              (a = d), (l = h);
            }));
        let u = this.pendingTasks.add();
        return (
          kv(this, () => {
            queueMicrotask(() => this.pendingTasks.remove(u));
          }),
          this.navigationTransitions.handleNavigationRequest({
            source: r,
            restoredState: i,
            currentUrlTree: this.currentUrlTree,
            currentRawUrl: this.currentUrlTree,
            rawUrl: t,
            extras: o,
            resolve: a,
            reject: l,
            promise: c,
            currentSnapshot: this.routerState.snapshot,
            currentRouterState: this.routerState,
          }),
          c.catch((d) => Promise.reject(d))
        );
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })();
function tT(e) {
  for (let n = 0; n < e.length; n++) if (e[n] == null) throw new D(4008, !1);
}
function nT(e) {
  return !(e instanceof lo) && !(e instanceof ai);
}
var Vt = (() => {
  class e {
    router;
    route;
    tabIndexAttribute;
    renderer;
    el;
    locationStrategy;
    href = null;
    target;
    queryParams;
    fragment;
    queryParamsHandling;
    state;
    info;
    relativeTo;
    isAnchorElement;
    subscription;
    onChanges = new Ee();
    constructor(t, r, i, o, s, a) {
      (this.router = t),
        (this.route = r),
        (this.tabIndexAttribute = i),
        (this.renderer = o),
        (this.el = s),
        (this.locationStrategy = a);
      let l = s.nativeElement.tagName?.toLowerCase();
      (this.isAnchorElement = l === "a" || l === "area"),
        this.isAnchorElement
          ? (this.subscription = t.events.subscribe((c) => {
              c instanceof ut && this.updateHref();
            }))
          : this.setTabIndexIfNotOnNativeEl("0");
    }
    preserveFragment = !1;
    skipLocationChange = !1;
    replaceUrl = !1;
    setTabIndexIfNotOnNativeEl(t) {
      this.tabIndexAttribute != null ||
        this.isAnchorElement ||
        this.applyAttributeValue("tabindex", t);
    }
    ngOnChanges(t) {
      this.isAnchorElement && this.updateHref(), this.onChanges.next(this);
    }
    routerLinkInput = null;
    set routerLink(t) {
      t == null
        ? ((this.routerLinkInput = null), this.setTabIndexIfNotOnNativeEl(null))
        : (ar(t)
            ? (this.routerLinkInput = t)
            : (this.routerLinkInput = Array.isArray(t) ? t : [t]),
          this.setTabIndexIfNotOnNativeEl("0"));
    }
    onClick(t, r, i, o, s) {
      let a = this.urlTree;
      if (
        a === null ||
        (this.isAnchorElement &&
          (t !== 0 ||
            r ||
            i ||
            o ||
            s ||
            (typeof this.target == "string" && this.target != "_self")))
      )
        return !0;
      let l = {
        skipLocationChange: this.skipLocationChange,
        replaceUrl: this.replaceUrl,
        state: this.state,
        info: this.info,
      };
      return this.router.navigateByUrl(a, l), !this.isAnchorElement;
    }
    ngOnDestroy() {
      this.subscription?.unsubscribe();
    }
    updateHref() {
      let t = this.urlTree;
      this.href =
        t !== null && this.locationStrategy
          ? this.locationStrategy?.prepareExternalUrl(
              this.router.serializeUrl(t)
            )
          : null;
      let r =
        this.href === null
          ? null
          : rm(this.href, this.el.nativeElement.tagName.toLowerCase(), "href");
      this.applyAttributeValue("href", r);
    }
    applyAttributeValue(t, r) {
      let i = this.renderer,
        o = this.el.nativeElement;
      r !== null ? i.setAttribute(o, t, r) : i.removeAttribute(o, t);
    }
    get urlTree() {
      return this.routerLinkInput === null
        ? null
        : ar(this.routerLinkInput)
        ? this.routerLinkInput
        : this.router.createUrlTree(this.routerLinkInput, {
            relativeTo:
              this.relativeTo !== void 0 ? this.relativeTo : this.route,
            queryParams: this.queryParams,
            fragment: this.fragment,
            queryParamsHandling: this.queryParamsHandling,
            preserveFragment: this.preserveFragment,
          });
    }
    static ɵfac = function (r) {
      return new (r || e)(C(ce), C(Et), Lu("tabindex"), C(Ft), C(Dt), C(on));
    };
    static ɵdir = de({
      type: e,
      selectors: [["", "routerLink", ""]],
      hostVars: 1,
      hostBindings: function (r, i) {
        r & 1 &&
          j("click", function (s) {
            return i.onClick(
              s.button,
              s.ctrlKey,
              s.shiftKey,
              s.altKey,
              s.metaKey
            );
          }),
          r & 2 && $i("target", i.target);
      },
      inputs: {
        target: "target",
        queryParams: "queryParams",
        fragment: "fragment",
        queryParamsHandling: "queryParamsHandling",
        state: "state",
        info: "info",
        relativeTo: "relativeTo",
        preserveFragment: [2, "preserveFragment", "preserveFragment", Tn],
        skipLocationChange: [2, "skipLocationChange", "skipLocationChange", Tn],
        replaceUrl: [2, "replaceUrl", "replaceUrl", Tn],
        routerLink: "routerLink",
      },
      features: [ad, Xn],
    });
  }
  return e;
})();
var dl = class {};
var rT = (() => {
    class e {
      router;
      injector;
      preloadingStrategy;
      loader;
      subscription;
      constructor(t, r, i, o, s) {
        (this.router = t),
          (this.injector = i),
          (this.preloadingStrategy = o),
          (this.loader = s);
      }
      setUpPreloading() {
        this.subscription = this.router.events
          .pipe(
            je((t) => t instanceof ut),
            Gt(() => this.preload())
          )
          .subscribe(() => {});
      }
      preload() {
        return this.processRoutes(this.injector, this.router.config);
      }
      ngOnDestroy() {
        this.subscription && this.subscription.unsubscribe();
      }
      processRoutes(t, r) {
        let i = [];
        for (let o of r) {
          o.providers &&
            !o._injector &&
            (o._injector = wa(o.providers, t, `Route: ${o.path}`));
          let s = o._injector ?? t,
            a = o._loadedInjector ?? s;
          ((o.loadChildren && !o._loadedRoutes && o.canLoad === void 0) ||
            (o.loadComponent && !o._loadedComponent)) &&
            i.push(this.preloadConfig(s, o)),
            (o.children || o._loadedRoutes) &&
              i.push(this.processRoutes(a, o.children ?? o._loadedRoutes));
        }
        return ae(i).pipe(Cr());
      }
      preloadConfig(t, r) {
        return this.preloadingStrategy.preload(r, () => {
          let i;
          r.loadChildren && r.canLoad === void 0
            ? (i = this.loader.loadChildren(t, r))
            : (i = P(null));
          let o = i.pipe(
            ve((s) =>
              s === null
                ? P(void 0)
                : ((r._loadedRoutes = s.routes),
                  (r._loadedInjector = s.injector),
                  this.processRoutes(s.injector ?? t, s.routes))
            )
          );
          if (r.loadComponent && !r._loadedComponent) {
            let s = this.loader.loadComponent(r);
            return ae([o, s]).pipe(Cr());
          } else return o;
        });
      }
      static ɵfac = function (r) {
        return new (r || e)(M(ce), M(Pa), M(Oe), M(dl), M(vf));
      };
      static ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })(),
  Lv = new I(""),
  iT = (() => {
    class e {
      urlSerializer;
      transitions;
      viewportScroller;
      zone;
      options;
      routerEventsSubscription;
      scrollEventsSubscription;
      lastId = 0;
      lastSource = "imperative";
      restoredId = 0;
      store = {};
      constructor(t, r, i, o, s = {}) {
        (this.urlSerializer = t),
          (this.transitions = r),
          (this.viewportScroller = i),
          (this.zone = o),
          (this.options = s),
          (s.scrollPositionRestoration ||= "disabled"),
          (s.anchorScrolling ||= "disabled");
      }
      init() {
        this.options.scrollPositionRestoration !== "disabled" &&
          this.viewportScroller.setHistoryScrollRestoration("manual"),
          (this.routerEventsSubscription = this.createScrollEvents()),
          (this.scrollEventsSubscription = this.consumeScrollEvents());
      }
      createScrollEvents() {
        return this.transitions.events.subscribe((t) => {
          t instanceof Pn
            ? ((this.store[this.lastId] =
                this.viewportScroller.getScrollPosition()),
              (this.lastSource = t.navigationTrigger),
              (this.restoredId = t.restoredState
                ? t.restoredState.navigationId
                : 0))
            : t instanceof ut
            ? ((this.lastId = t.id),
              this.scheduleScrollEvent(
                t,
                this.urlSerializer.parse(t.urlAfterRedirects).fragment
              ))
            : t instanceof On &&
              t.code === tl.IgnoredSameUrlNavigation &&
              ((this.lastSource = void 0),
              (this.restoredId = 0),
              this.scheduleScrollEvent(
                t,
                this.urlSerializer.parse(t.url).fragment
              ));
        });
      }
      consumeScrollEvents() {
        return this.transitions.events.subscribe((t) => {
          t instanceof rl &&
            (t.position
              ? this.options.scrollPositionRestoration === "top"
                ? this.viewportScroller.scrollToPosition([0, 0])
                : this.options.scrollPositionRestoration === "enabled" &&
                  this.viewportScroller.scrollToPosition(t.position)
              : t.anchor && this.options.anchorScrolling === "enabled"
              ? this.viewportScroller.scrollToAnchor(t.anchor)
              : this.options.scrollPositionRestoration !== "disabled" &&
                this.viewportScroller.scrollToPosition([0, 0]));
        });
      }
      scheduleScrollEvent(t, r) {
        this.zone.runOutsideAngular(() => {
          setTimeout(() => {
            this.zone.run(() => {
              this.transitions.events.next(
                new rl(
                  t,
                  this.lastSource === "popstate"
                    ? this.store[this.restoredId]
                    : null,
                  r
                )
              );
            });
          }, 0);
        });
      }
      ngOnDestroy() {
        this.routerEventsSubscription?.unsubscribe(),
          this.scrollEventsSubscription?.unsubscribe();
      }
      static ɵfac = function (r) {
        ym();
      };
      static ɵprov = b({ token: e, factory: e.ɵfac });
    }
    return e;
  })();
function oT(e) {
  return e.routerState.root;
}
function _o(e, n) {
  return { ɵkind: e, ɵproviders: n };
}
function sT() {
  let e = v(Ye);
  return (n) => {
    let t = e.get(en);
    if (n !== t.components[0]) return;
    let r = e.get(ce),
      i = e.get(Vv);
    e.get(Ef) === 1 && r.initialNavigation(),
      e.get(jv, null, $.Optional)?.setUpPreloading(),
      e.get(Lv, null, $.Optional)?.init(),
      r.resetRootComponentType(t.componentTypes[0]),
      i.closed || (i.next(), i.complete(), i.unsubscribe());
  };
}
var Vv = new I("", { factory: () => new Ee() }),
  Ef = new I("", { providedIn: "root", factory: () => 1 });
function aT() {
  return _o(2, [
    { provide: Ef, useValue: 0 },
    {
      provide: Sa,
      multi: !0,
      deps: [Ye],
      useFactory: (n) => {
        let t = n.get(gy, Promise.resolve());
        return () =>
          t.then(
            () =>
              new Promise((r) => {
                let i = n.get(ce),
                  o = n.get(Vv);
                kv(i, () => {
                  r(!0);
                }),
                  (n.get(_f).afterPreactivation = () => (
                    r(!0), o.closed ? P(void 0) : o
                  )),
                  i.initialNavigation();
              })
          );
      },
    },
  ]);
}
function lT() {
  return _o(3, [
    {
      provide: Sa,
      multi: !0,
      useFactory: () => {
        let n = v(ce);
        return () => {
          n.setUpLocationChangeListener();
        };
      },
    },
    { provide: Ef, useValue: 2 },
  ]);
}
var jv = new I("");
function cT(e) {
  return _o(0, [
    { provide: jv, useExisting: rT },
    { provide: dl, useExisting: e },
  ]);
}
function uT() {
  return _o(8, [Xy, { provide: fl, useExisting: Xy }]);
}
function dT(e) {
  let n = [
    { provide: Rv, useValue: WM },
    {
      provide: Pv,
      useValue: w({ skipNextTransition: !!e?.skipInitialTransition }, e),
    },
  ];
  return _o(9, n);
}
var rv = new I("ROUTER_FORROOT_GUARD"),
  fT = [
    Jr,
    { provide: go, useClass: si },
    ce,
    yo,
    { provide: Et, useFactory: oT, deps: [ce] },
    vf,
    [],
  ],
  wf = (() => {
    class e {
      constructor(t) {}
      static forRoot(t, r) {
        return {
          ngModule: e,
          providers: [
            fT,
            [],
            { provide: ul, multi: !0, useValue: t },
            { provide: rv, useFactory: mT, deps: [[ce, new ki(), new ia()]] },
            r?.errorHandler ? { provide: Ov, useValue: r.errorHandler } : [],
            { provide: Do, useValue: r || {} },
            r?.useHash ? pT() : gT(),
            hT(),
            r?.preloadingStrategy ? cT(r.preloadingStrategy).ɵproviders : [],
            r?.initialNavigation ? yT(r) : [],
            r?.bindToComponentInputs ? uT().ɵproviders : [],
            r?.enableViewTransitions ? dT().ɵproviders : [],
            vT(),
          ],
        };
      }
      static forChild(t) {
        return {
          ngModule: e,
          providers: [{ provide: ul, multi: !0, useValue: t }],
        };
      }
      static ɵfac = function (r) {
        return new (r || e)(M(rv, 8));
      };
      static ɵmod = Se({ type: e });
      static ɵinj = Ie({});
    }
    return e;
  })();
function hT() {
  return {
    provide: Lv,
    useFactory: () => {
      let e = v(wy),
        n = v(ee),
        t = v(Do),
        r = v(_f),
        i = v(go);
      return (
        t.scrollOffset && e.setOffset(t.scrollOffset), new iT(i, r, e, n, t)
      );
    },
  };
}
function pT() {
  return { provide: on, useClass: yy };
}
function gT() {
  return { provide: on, useClass: Ed };
}
function mT(e) {
  return "guarded";
}
function yT(e) {
  return [
    e.initialNavigation === "disabled" ? lT().ɵproviders : [],
    e.initialNavigation === "enabledBlocking" ? aT().ɵproviders : [],
  ];
}
var iv = new I("");
function vT() {
  return [
    { provide: iv, useFactory: sT },
    { provide: Ma, multi: !0, useExisting: iv },
  ];
}
var Bv = (() => {
  class e {
    static {
      this.ɵfac = function (r) {
        return new (r || e)();
      };
    }
    static {
      this.ɵcmp = J({
        type: e,
        selectors: [["app-home"]],
        standalone: !1,
        decls: 68,
        vars: 0,
        consts: [
          [1, "position-relative"],
          [
            "id",
            "carouselExampleAutoplaying",
            "data-bs-ride",
            "carousel",
            1,
            "carousel",
            "slide",
          ],
          [1, "carousel-inner"],
          [1, "carousel-item", "active"],
          [
            "src",
            "../../../assets/bg.jpg",
            "alt",
            "...",
            1,
            "d-block",
            "w-100",
            2,
            "max-height",
            "700px",
          ],
          [1, "carousel-item"],
          [
            "src",
            "../../../assets/home2 (1).jpg",
            "alt",
            "...",
            1,
            "d-block",
            "w-100",
            2,
            "max-height",
            "700px",
          ],
          [
            "src",
            "../../../assets/home2 (2).jpg",
            "alt",
            "...",
            1,
            "d-block",
            "w-100",
            2,
            "max-height",
            "700px",
          ],
          [
            "type",
            "button",
            "data-bs-target",
            "#carouselExampleAutoplaying",
            "data-bs-slide",
            "prev",
            1,
            "carousel-control-prev",
          ],
          ["aria-hidden", "true", 1, "carousel-control-prev-icon"],
          [1, "visually-hidden"],
          [
            "type",
            "button",
            "data-bs-target",
            "#carouselExampleAutoplaying",
            "data-bs-slide",
            "next",
            1,
            "carousel-control-next",
          ],
          ["aria-hidden", "true", 1, "carousel-control-next-icon"],
          [1, "position-absolute", "top-50", "start-50", "translate-middle"],
          [1, "text-white"],
          [1, "mx-5", "mt-5"],
          [
            1,
            "row",
            "row-cols-1",
            "row-cols-md-2",
            "d-flex",
            "align-items-center",
          ],
          [1, "mb-2"],
          [1, "card", "border-0"],
          [1, "card-body"],
          [
            1,
            "card-title",
            "text-center",
            2,
            "font-family",
            "Sofia, sans-serif",
          ],
          [1, "card-text"],
          [
            "src",
            "../../../assets/2.jpg",
            "alt",
            "Responsive image",
            1,
            "w-100",
            "rounded",
          ],
          [1, "mx-5", "my-5"],
          [1, ""],
          [
            "src",
            "../../../assets/4.jpg",
            "alt",
            "Responsive image",
            1,
            "w-100",
            "rounded",
          ],
          [1, "mt-2"],
          [1, "text-center", "my-5", 2, "font-family", "Sofia, sans-serif"],
          [1, "mt-5", "container"],
          [1, "row", "row-cols-1", "row-cols-md-3"],
          [1, "d-flex", "justify-content-center", "py-5"],
          [
            1,
            "card",
            "mb-3",
            "bg-body-tertiary",
            "border-0",
            2,
            "max-width",
            "18rem",
          ],
          [
            1,
            "card-header",
            "text-center",
            "text-info",
            "bg-transparent",
            "border-0",
          ],
          [1, "card-body", "text-center"],
          [1, "card-title"],
          [
            1,
            "card-header",
            "text-center",
            "text-danger",
            "bg-transparent",
            "border-0",
          ],
          [1, "card-title", "px-5"],
          [
            1,
            "card-header",
            "text-center",
            "text-warning",
            "bg-transparent",
            "border-0",
          ],
        ],
        template: function (r, i) {
          r & 1 &&
            (p(0, "div")(1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "div", 3),
            V(5, "img", 4),
            g(),
            p(6, "div", 5),
            V(7, "img", 6),
            g(),
            p(8, "div", 5),
            V(9, "img", 7),
            g()(),
            p(10, "button", 8),
            V(11, "span", 9),
            p(12, "span", 10),
            _(13, "Previous"),
            g()(),
            p(14, "button", 11),
            V(15, "span", 12),
            p(16, "span", 10),
            _(17, "Next"),
            g()()(),
            p(18, "div", 13)(19, "h1", 14),
            _(20, "Welcome"),
            g()()(),
            p(21, "div", 15)(22, "div", 16)(23, "div", 17)(24, "div", 18)(
              25,
              "div",
              19
            )(26, "h5", 20),
            _(27, " About Us "),
            g(),
            p(28, "p", 21),
            _(
              29,
              " we strive to provide top-notch services that exceed expectations. Our team of experts is dedicated to ensuring your success "
            ),
            g()()()(),
            p(30, "div"),
            V(31, "img", 22),
            g()()(),
            p(32, "div", 23)(33, "div", 16)(34, "div", 24),
            V(35, "img", 25),
            g(),
            p(36, "div", 26)(37, "div", 18)(38, "div", 19)(39, "h5", 20),
            _(40, " Our Promise "),
            g(),
            p(41, "p", 21),
            _(
              42,
              " We guarantee exceptional results, backed by years of experience and a commitment to quality. "
            ),
            g()()()()()(),
            p(43, "h2", 27),
            _(
              44,
              ` What Makes Us Stand Out
`
            ),
            g(),
            p(45, "div", 28)(46, "div", 29)(47, "div", 30)(48, "div", 31)(
              49,
              "div",
              32
            ),
            _(50, " \u{1F3C6} Why Choose Us?"),
            g(),
            p(51, "div", 33)(52, "p", 34),
            _(53, "We deliver quality, reliability, and trust"),
            g()()()(),
            p(54, "div", 30)(55, "div", 31)(56, "div", 35),
            _(57, " \u{1F6E0}\uFE0F What We Offer"),
            g(),
            p(58, "div", 33)(59, "p", 36),
            _(60, "Services tailored to your needs."),
            g()()()(),
            p(61, "div", 30)(62, "div", 31)(63, "div", 37),
            _(64, "\u{1F31F} Our Mission"),
            g(),
            p(65, "div", 33)(66, "p", 34),
            _(67, "Empowering individuals and businesses through innovation"),
            g()()()()()()());
        },
        encapsulation: 2,
      });
    }
  }
  return e;
})();
var dt = (() => {
  class e {
    constructor(t) {
      (this.http = t),
        (this.apiUrl = "https://furniture-production-4fc8.up.railway.app");
    }
    register(t) {
      return this.http.post(`${this.apiUrl}/accounts/register/`, t);
    }
    login(t) {
      return this.http.post(`${this.apiUrl}/accounts/login/`, t);
    }
    updateProfile(t) {
      let r = localStorage.getItem("token");
      return this.http.put(`${this.apiUrl}/accounts/update/`, t, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${r}`,
        },
      });
    }
    isAuthenticated() {
      return !!localStorage.getItem("token");
    }
    isAdmin() {
      return !!JSON.parse(localStorage.getItem("role") || "{}");
    }
    logout() {
      return this.http.post(`${this.apiUrl}/accounts/logout/`, {});
    }
    static {
      this.ɵfac = function (r) {
        return new (r || e)(M(Ki));
      };
    }
    static {
      this.ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
  }
  return e;
})();
var Kv = (() => {
    class e {
      _renderer;
      _elementRef;
      onChange = (t) => {};
      onTouched = () => {};
      constructor(t, r) {
        (this._renderer = t), (this._elementRef = r);
      }
      setProperty(t, r) {
        this._renderer.setProperty(this._elementRef.nativeElement, t, r);
      }
      registerOnTouched(t) {
        this.onTouched = t;
      }
      registerOnChange(t) {
        this.onChange = t;
      }
      setDisabledState(t) {
        this.setProperty("disabled", t);
      }
      static ɵfac = function (r) {
        return new (r || e)(C(Ft), C(Dt));
      };
      static ɵdir = de({ type: e });
    }
    return e;
  })(),
  wl = (() => {
    class e extends Kv {
      static ɵfac = (() => {
        let t;
        return function (i) {
          return (t || (t = Yt(e)))(i || e);
        };
      })();
      static ɵdir = de({ type: e, features: [lt] });
    }
    return e;
  })(),
  Mo = new I("");
var DT = { provide: Mo, useExisting: Ot(() => ze), multi: !0 };
function _T() {
  let e = kt() ? kt().getUserAgent() : "";
  return /android (\d+)/.test(e.toLowerCase());
}
var ET = new I(""),
  ze = (() => {
    class e extends Kv {
      _compositionMode;
      _composing = !1;
      constructor(t, r, i) {
        super(t, r),
          (this._compositionMode = i),
          this._compositionMode == null && (this._compositionMode = !_T());
      }
      writeValue(t) {
        let r = t ?? "";
        this.setProperty("value", r);
      }
      _handleInput(t) {
        (!this._compositionMode ||
          (this._compositionMode && !this._composing)) &&
          this.onChange(t);
      }
      _compositionStart() {
        this._composing = !0;
      }
      _compositionEnd(t) {
        (this._composing = !1), this._compositionMode && this.onChange(t);
      }
      static ɵfac = function (r) {
        return new (r || e)(C(Ft), C(Dt), C(ET, 8));
      };
      static ɵdir = de({
        type: e,
        selectors: [
          ["input", "formControlName", "", 3, "type", "checkbox"],
          ["textarea", "formControlName", ""],
          ["input", "formControl", "", 3, "type", "checkbox"],
          ["textarea", "formControl", ""],
          ["input", "ngModel", "", 3, "type", "checkbox"],
          ["textarea", "ngModel", ""],
          ["", "ngDefaultControl", ""],
        ],
        hostBindings: function (r, i) {
          r & 1 &&
            j("input", function (s) {
              return i._handleInput(s.target.value);
            })("blur", function () {
              return i.onTouched();
            })("compositionstart", function () {
              return i._compositionStart();
            })("compositionend", function (s) {
              return i._compositionEnd(s.target.value);
            });
        },
        standalone: !1,
        features: [Mn([DT]), lt],
      });
    }
    return e;
  })();
function wT(e) {
  return (
    e == null || ((typeof e == "string" || Array.isArray(e)) && e.length === 0)
  );
}
var bf = new I(""),
  Yv = new I("");
function CT(e) {
  return wT(e.value) ? { required: !0 } : null;
}
function Uv(e) {
  return null;
}
function Jv(e) {
  return e != null;
}
function Xv(e) {
  return nr(e) ? ae(e) : e;
}
function eD(e) {
  let n = {};
  return (
    e.forEach((t) => {
      n = t != null ? w(w({}, n), t) : n;
    }),
    Object.keys(n).length === 0 ? null : n
  );
}
function tD(e, n) {
  return n.map((t) => t(e));
}
function bT(e) {
  return !e.validate;
}
function nD(e) {
  return e.map((n) => (bT(n) ? n : (t) => n.validate(t)));
}
function IT(e) {
  if (!e) return null;
  let n = e.filter(Jv);
  return n.length == 0
    ? null
    : function (t) {
        return eD(tD(t, n));
      };
}
function If(e) {
  return e != null ? IT(nD(e)) : null;
}
function ST(e) {
  if (!e) return null;
  let n = e.filter(Jv);
  return n.length == 0
    ? null
    : function (t) {
        let r = tD(t, n).map(Xv);
        return pc(r).pipe(L(eD));
      };
}
function Sf(e) {
  return e != null ? ST(nD(e)) : null;
}
function $v(e, n) {
  return e === null ? [n] : Array.isArray(e) ? [...e, n] : [e, n];
}
function MT(e) {
  return e._rawValidators;
}
function TT(e) {
  return e._rawAsyncValidators;
}
function Cf(e) {
  return e ? (Array.isArray(e) ? e : [e]) : [];
}
function ml(e, n) {
  return Array.isArray(e) ? e.includes(n) : e === n;
}
function Hv(e, n) {
  let t = Cf(n);
  return (
    Cf(e).forEach((i) => {
      ml(t, i) || t.push(i);
    }),
    t
  );
}
function zv(e, n) {
  return Cf(n).filter((t) => !ml(e, t));
}
var yl = class {
    get value() {
      return this.control ? this.control.value : null;
    }
    get valid() {
      return this.control ? this.control.valid : null;
    }
    get invalid() {
      return this.control ? this.control.invalid : null;
    }
    get pending() {
      return this.control ? this.control.pending : null;
    }
    get disabled() {
      return this.control ? this.control.disabled : null;
    }
    get enabled() {
      return this.control ? this.control.enabled : null;
    }
    get errors() {
      return this.control ? this.control.errors : null;
    }
    get pristine() {
      return this.control ? this.control.pristine : null;
    }
    get dirty() {
      return this.control ? this.control.dirty : null;
    }
    get touched() {
      return this.control ? this.control.touched : null;
    }
    get status() {
      return this.control ? this.control.status : null;
    }
    get untouched() {
      return this.control ? this.control.untouched : null;
    }
    get statusChanges() {
      return this.control ? this.control.statusChanges : null;
    }
    get valueChanges() {
      return this.control ? this.control.valueChanges : null;
    }
    get path() {
      return null;
    }
    _composedValidatorFn;
    _composedAsyncValidatorFn;
    _rawValidators = [];
    _rawAsyncValidators = [];
    _setValidators(n) {
      (this._rawValidators = n || []),
        (this._composedValidatorFn = If(this._rawValidators));
    }
    _setAsyncValidators(n) {
      (this._rawAsyncValidators = n || []),
        (this._composedAsyncValidatorFn = Sf(this._rawAsyncValidators));
    }
    get validator() {
      return this._composedValidatorFn || null;
    }
    get asyncValidator() {
      return this._composedAsyncValidatorFn || null;
    }
    _onDestroyCallbacks = [];
    _registerOnDestroy(n) {
      this._onDestroyCallbacks.push(n);
    }
    _invokeOnDestroyCallbacks() {
      this._onDestroyCallbacks.forEach((n) => n()),
        (this._onDestroyCallbacks = []);
    }
    reset(n = void 0) {
      this.control && this.control.reset(n);
    }
    hasError(n, t) {
      return this.control ? this.control.hasError(n, t) : !1;
    }
    getError(n, t) {
      return this.control ? this.control.getError(n, t) : null;
    }
  },
  fi = class extends yl {
    name;
    get formDirective() {
      return null;
    }
    get path() {
      return null;
    }
  },
  So = class extends yl {
    _parent = null;
    name = null;
    valueAccessor = null;
  },
  vl = class {
    _cd;
    constructor(n) {
      this._cd = n;
    }
    get isTouched() {
      return this._cd?.control?._touched?.(), !!this._cd?.control?.touched;
    }
    get isUntouched() {
      return !!this._cd?.control?.untouched;
    }
    get isPristine() {
      return this._cd?.control?._pristine?.(), !!this._cd?.control?.pristine;
    }
    get isDirty() {
      return !!this._cd?.control?.dirty;
    }
    get isValid() {
      return this._cd?.control?._status?.(), !!this._cd?.control?.valid;
    }
    get isInvalid() {
      return !!this._cd?.control?.invalid;
    }
    get isPending() {
      return !!this._cd?.control?.pending;
    }
    get isSubmitted() {
      return this._cd?._submitted?.(), !!this._cd?.submitted;
    }
  },
  AT = {
    "[class.ng-untouched]": "isUntouched",
    "[class.ng-touched]": "isTouched",
    "[class.ng-pristine]": "isPristine",
    "[class.ng-dirty]": "isDirty",
    "[class.ng-valid]": "isValid",
    "[class.ng-invalid]": "isInvalid",
    "[class.ng-pending]": "isPending",
  },
  ML = q(w({}, AT), { "[class.ng-submitted]": "isSubmitted" }),
  ft = (() => {
    class e extends vl {
      constructor(t) {
        super(t);
      }
      static ɵfac = function (r) {
        return new (r || e)(C(So, 2));
      };
      static ɵdir = de({
        type: e,
        selectors: [
          ["", "formControlName", ""],
          ["", "ngModel", ""],
          ["", "formControl", ""],
        ],
        hostVars: 14,
        hostBindings: function (r, i) {
          r & 2 &&
            Ta("ng-untouched", i.isUntouched)("ng-touched", i.isTouched)(
              "ng-pristine",
              i.isPristine
            )("ng-dirty", i.isDirty)("ng-valid", i.isValid)(
              "ng-invalid",
              i.isInvalid
            )("ng-pending", i.isPending);
        },
        standalone: !1,
        features: [lt],
      });
    }
    return e;
  })(),
  jt = (() => {
    class e extends vl {
      constructor(t) {
        super(t);
      }
      static ɵfac = function (r) {
        return new (r || e)(C(fi, 10));
      };
      static ɵdir = de({
        type: e,
        selectors: [
          ["", "formGroupName", ""],
          ["", "formArrayName", ""],
          ["", "ngModelGroup", ""],
          ["", "formGroup", ""],
          ["form", 3, "ngNoForm", ""],
          ["", "ngForm", ""],
        ],
        hostVars: 16,
        hostBindings: function (r, i) {
          r & 2 &&
            Ta("ng-untouched", i.isUntouched)("ng-touched", i.isTouched)(
              "ng-pristine",
              i.isPristine
            )("ng-dirty", i.isDirty)("ng-valid", i.isValid)(
              "ng-invalid",
              i.isInvalid
            )("ng-pending", i.isPending)("ng-submitted", i.isSubmitted);
        },
        standalone: !1,
        features: [lt],
      });
    }
    return e;
  })();
var Eo = "VALID",
  gl = "INVALID",
  ui = "PENDING",
  wo = "DISABLED",
  hi = class {},
  Dl = class extends hi {
    value;
    source;
    constructor(n, t) {
      super(), (this.value = n), (this.source = t);
    }
  },
  bo = class extends hi {
    pristine;
    source;
    constructor(n, t) {
      super(), (this.pristine = n), (this.source = t);
    }
  },
  Io = class extends hi {
    touched;
    source;
    constructor(n, t) {
      super(), (this.touched = n), (this.source = t);
    }
  },
  di = class extends hi {
    status;
    source;
    constructor(n, t) {
      super(), (this.status = n), (this.source = t);
    }
  };
function rD(e) {
  return (Cl(e) ? e.validators : e) || null;
}
function NT(e) {
  return Array.isArray(e) ? If(e) : e || null;
}
function iD(e, n) {
  return (Cl(n) ? n.asyncValidators : e) || null;
}
function xT(e) {
  return Array.isArray(e) ? Sf(e) : e || null;
}
function Cl(e) {
  return e != null && !Array.isArray(e) && typeof e == "object";
}
function RT(e, n, t) {
  let r = e.controls;
  if (!(n ? Object.keys(r) : r).length) throw new D(1e3, "");
  if (!r[t]) throw new D(1001, "");
}
function PT(e, n, t) {
  e._forEachChild((r, i) => {
    if (t[i] === void 0) throw new D(1002, "");
  });
}
var _l = class {
    _pendingDirty = !1;
    _hasOwnPendingAsyncValidator = null;
    _pendingTouched = !1;
    _onCollectionChange = () => {};
    _updateOn;
    _parent = null;
    _asyncValidationSubscription;
    _composedValidatorFn;
    _composedAsyncValidatorFn;
    _rawValidators;
    _rawAsyncValidators;
    value;
    constructor(n, t) {
      this._assignValidators(n), this._assignAsyncValidators(t);
    }
    get validator() {
      return this._composedValidatorFn;
    }
    set validator(n) {
      this._rawValidators = this._composedValidatorFn = n;
    }
    get asyncValidator() {
      return this._composedAsyncValidatorFn;
    }
    set asyncValidator(n) {
      this._rawAsyncValidators = this._composedAsyncValidatorFn = n;
    }
    get parent() {
      return this._parent;
    }
    get status() {
      return tn(this.statusReactive);
    }
    set status(n) {
      tn(() => this.statusReactive.set(n));
    }
    _status = Hi(() => this.statusReactive());
    statusReactive = Ui(void 0);
    get valid() {
      return this.status === Eo;
    }
    get invalid() {
      return this.status === gl;
    }
    get pending() {
      return this.status == ui;
    }
    get disabled() {
      return this.status === wo;
    }
    get enabled() {
      return this.status !== wo;
    }
    errors;
    get pristine() {
      return tn(this.pristineReactive);
    }
    set pristine(n) {
      tn(() => this.pristineReactive.set(n));
    }
    _pristine = Hi(() => this.pristineReactive());
    pristineReactive = Ui(!0);
    get dirty() {
      return !this.pristine;
    }
    get touched() {
      return tn(this.touchedReactive);
    }
    set touched(n) {
      tn(() => this.touchedReactive.set(n));
    }
    _touched = Hi(() => this.touchedReactive());
    touchedReactive = Ui(!1);
    get untouched() {
      return !this.touched;
    }
    _events = new Ee();
    events = this._events.asObservable();
    valueChanges;
    statusChanges;
    get updateOn() {
      return this._updateOn
        ? this._updateOn
        : this.parent
        ? this.parent.updateOn
        : "change";
    }
    setValidators(n) {
      this._assignValidators(n);
    }
    setAsyncValidators(n) {
      this._assignAsyncValidators(n);
    }
    addValidators(n) {
      this.setValidators(Hv(n, this._rawValidators));
    }
    addAsyncValidators(n) {
      this.setAsyncValidators(Hv(n, this._rawAsyncValidators));
    }
    removeValidators(n) {
      this.setValidators(zv(n, this._rawValidators));
    }
    removeAsyncValidators(n) {
      this.setAsyncValidators(zv(n, this._rawAsyncValidators));
    }
    hasValidator(n) {
      return ml(this._rawValidators, n);
    }
    hasAsyncValidator(n) {
      return ml(this._rawAsyncValidators, n);
    }
    clearValidators() {
      this.validator = null;
    }
    clearAsyncValidators() {
      this.asyncValidator = null;
    }
    markAsTouched(n = {}) {
      let t = this.touched === !1;
      this.touched = !0;
      let r = n.sourceControl ?? this;
      this._parent &&
        !n.onlySelf &&
        this._parent.markAsTouched(q(w({}, n), { sourceControl: r })),
        t && n.emitEvent !== !1 && this._events.next(new Io(!0, r));
    }
    markAllAsTouched(n = {}) {
      this.markAsTouched({
        onlySelf: !0,
        emitEvent: n.emitEvent,
        sourceControl: this,
      }),
        this._forEachChild((t) => t.markAllAsTouched(n));
    }
    markAsUntouched(n = {}) {
      let t = this.touched === !0;
      (this.touched = !1), (this._pendingTouched = !1);
      let r = n.sourceControl ?? this;
      this._forEachChild((i) => {
        i.markAsUntouched({
          onlySelf: !0,
          emitEvent: n.emitEvent,
          sourceControl: r,
        });
      }),
        this._parent && !n.onlySelf && this._parent._updateTouched(n, r),
        t && n.emitEvent !== !1 && this._events.next(new Io(!1, r));
    }
    markAsDirty(n = {}) {
      let t = this.pristine === !0;
      this.pristine = !1;
      let r = n.sourceControl ?? this;
      this._parent &&
        !n.onlySelf &&
        this._parent.markAsDirty(q(w({}, n), { sourceControl: r })),
        t && n.emitEvent !== !1 && this._events.next(new bo(!1, r));
    }
    markAsPristine(n = {}) {
      let t = this.pristine === !1;
      (this.pristine = !0), (this._pendingDirty = !1);
      let r = n.sourceControl ?? this;
      this._forEachChild((i) => {
        i.markAsPristine({ onlySelf: !0, emitEvent: n.emitEvent });
      }),
        this._parent && !n.onlySelf && this._parent._updatePristine(n, r),
        t && n.emitEvent !== !1 && this._events.next(new bo(!0, r));
    }
    markAsPending(n = {}) {
      this.status = ui;
      let t = n.sourceControl ?? this;
      n.emitEvent !== !1 &&
        (this._events.next(new di(this.status, t)),
        this.statusChanges.emit(this.status)),
        this._parent &&
          !n.onlySelf &&
          this._parent.markAsPending(q(w({}, n), { sourceControl: t }));
    }
    disable(n = {}) {
      let t = this._parentMarkedDirty(n.onlySelf);
      (this.status = wo),
        (this.errors = null),
        this._forEachChild((i) => {
          i.disable(q(w({}, n), { onlySelf: !0 }));
        }),
        this._updateValue();
      let r = n.sourceControl ?? this;
      n.emitEvent !== !1 &&
        (this._events.next(new Dl(this.value, r)),
        this._events.next(new di(this.status, r)),
        this.valueChanges.emit(this.value),
        this.statusChanges.emit(this.status)),
        this._updateAncestors(q(w({}, n), { skipPristineCheck: t }), this),
        this._onDisabledChange.forEach((i) => i(!0));
    }
    enable(n = {}) {
      let t = this._parentMarkedDirty(n.onlySelf);
      (this.status = Eo),
        this._forEachChild((r) => {
          r.enable(q(w({}, n), { onlySelf: !0 }));
        }),
        this.updateValueAndValidity({ onlySelf: !0, emitEvent: n.emitEvent }),
        this._updateAncestors(q(w({}, n), { skipPristineCheck: t }), this),
        this._onDisabledChange.forEach((r) => r(!1));
    }
    _updateAncestors(n, t) {
      this._parent &&
        !n.onlySelf &&
        (this._parent.updateValueAndValidity(n),
        n.skipPristineCheck || this._parent._updatePristine({}, t),
        this._parent._updateTouched({}, t));
    }
    setParent(n) {
      this._parent = n;
    }
    getRawValue() {
      return this.value;
    }
    updateValueAndValidity(n = {}) {
      if ((this._setInitialStatus(), this._updateValue(), this.enabled)) {
        let r = this._cancelExistingSubscription();
        (this.errors = this._runValidator()),
          (this.status = this._calculateStatus()),
          (this.status === Eo || this.status === ui) &&
            this._runAsyncValidator(r, n.emitEvent);
      }
      let t = n.sourceControl ?? this;
      n.emitEvent !== !1 &&
        (this._events.next(new Dl(this.value, t)),
        this._events.next(new di(this.status, t)),
        this.valueChanges.emit(this.value),
        this.statusChanges.emit(this.status)),
        this._parent &&
          !n.onlySelf &&
          this._parent.updateValueAndValidity(
            q(w({}, n), { sourceControl: t })
          );
    }
    _updateTreeValidity(n = { emitEvent: !0 }) {
      this._forEachChild((t) => t._updateTreeValidity(n)),
        this.updateValueAndValidity({ onlySelf: !0, emitEvent: n.emitEvent });
    }
    _setInitialStatus() {
      this.status = this._allControlsDisabled() ? wo : Eo;
    }
    _runValidator() {
      return this.validator ? this.validator(this) : null;
    }
    _runAsyncValidator(n, t) {
      if (this.asyncValidator) {
        (this.status = ui),
          (this._hasOwnPendingAsyncValidator = { emitEvent: t !== !1 });
        let r = Xv(this.asyncValidator(this));
        this._asyncValidationSubscription = r.subscribe((i) => {
          (this._hasOwnPendingAsyncValidator = null),
            this.setErrors(i, { emitEvent: t, shouldHaveEmitted: n });
        });
      }
    }
    _cancelExistingSubscription() {
      if (this._asyncValidationSubscription) {
        this._asyncValidationSubscription.unsubscribe();
        let n = this._hasOwnPendingAsyncValidator?.emitEvent ?? !1;
        return (this._hasOwnPendingAsyncValidator = null), n;
      }
      return !1;
    }
    setErrors(n, t = {}) {
      (this.errors = n),
        this._updateControlsErrors(
          t.emitEvent !== !1,
          this,
          t.shouldHaveEmitted
        );
    }
    get(n) {
      let t = n;
      return t == null ||
        (Array.isArray(t) || (t = t.split(".")), t.length === 0)
        ? null
        : t.reduce((r, i) => r && r._find(i), this);
    }
    getError(n, t) {
      let r = t ? this.get(t) : this;
      return r && r.errors ? r.errors[n] : null;
    }
    hasError(n, t) {
      return !!this.getError(n, t);
    }
    get root() {
      let n = this;
      for (; n._parent; ) n = n._parent;
      return n;
    }
    _updateControlsErrors(n, t, r) {
      (this.status = this._calculateStatus()),
        n && this.statusChanges.emit(this.status),
        (n || r) && this._events.next(new di(this.status, t)),
        this._parent && this._parent._updateControlsErrors(n, t, r);
    }
    _initObservables() {
      (this.valueChanges = new pe()), (this.statusChanges = new pe());
    }
    _calculateStatus() {
      return this._allControlsDisabled()
        ? wo
        : this.errors
        ? gl
        : this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(ui)
        ? ui
        : this._anyControlsHaveStatus(gl)
        ? gl
        : Eo;
    }
    _anyControlsHaveStatus(n) {
      return this._anyControls((t) => t.status === n);
    }
    _anyControlsDirty() {
      return this._anyControls((n) => n.dirty);
    }
    _anyControlsTouched() {
      return this._anyControls((n) => n.touched);
    }
    _updatePristine(n, t) {
      let r = !this._anyControlsDirty(),
        i = this.pristine !== r;
      (this.pristine = r),
        this._parent && !n.onlySelf && this._parent._updatePristine(n, t),
        i && this._events.next(new bo(this.pristine, t));
    }
    _updateTouched(n = {}, t) {
      (this.touched = this._anyControlsTouched()),
        this._events.next(new Io(this.touched, t)),
        this._parent && !n.onlySelf && this._parent._updateTouched(n, t);
    }
    _onDisabledChange = [];
    _registerOnCollectionChange(n) {
      this._onCollectionChange = n;
    }
    _setUpdateStrategy(n) {
      Cl(n) && n.updateOn != null && (this._updateOn = n.updateOn);
    }
    _parentMarkedDirty(n) {
      let t = this._parent && this._parent.dirty;
      return !n && !!t && !this._parent._anyControlsDirty();
    }
    _find(n) {
      return null;
    }
    _assignValidators(n) {
      (this._rawValidators = Array.isArray(n) ? n.slice() : n),
        (this._composedValidatorFn = NT(this._rawValidators));
    }
    _assignAsyncValidators(n) {
      (this._rawAsyncValidators = Array.isArray(n) ? n.slice() : n),
        (this._composedAsyncValidatorFn = xT(this._rawAsyncValidators));
    }
  },
  El = class extends _l {
    constructor(n, t, r) {
      super(rD(t), iD(r, t)),
        (this.controls = n),
        this._initObservables(),
        this._setUpdateStrategy(t),
        this._setUpControls(),
        this.updateValueAndValidity({
          onlySelf: !0,
          emitEvent: !!this.asyncValidator,
        });
    }
    controls;
    registerControl(n, t) {
      return this.controls[n]
        ? this.controls[n]
        : ((this.controls[n] = t),
          t.setParent(this),
          t._registerOnCollectionChange(this._onCollectionChange),
          t);
    }
    addControl(n, t, r = {}) {
      this.registerControl(n, t),
        this.updateValueAndValidity({ emitEvent: r.emitEvent }),
        this._onCollectionChange();
    }
    removeControl(n, t = {}) {
      this.controls[n] &&
        this.controls[n]._registerOnCollectionChange(() => {}),
        delete this.controls[n],
        this.updateValueAndValidity({ emitEvent: t.emitEvent }),
        this._onCollectionChange();
    }
    setControl(n, t, r = {}) {
      this.controls[n] &&
        this.controls[n]._registerOnCollectionChange(() => {}),
        delete this.controls[n],
        t && this.registerControl(n, t),
        this.updateValueAndValidity({ emitEvent: r.emitEvent }),
        this._onCollectionChange();
    }
    contains(n) {
      return this.controls.hasOwnProperty(n) && this.controls[n].enabled;
    }
    setValue(n, t = {}) {
      PT(this, !0, n),
        Object.keys(n).forEach((r) => {
          RT(this, !0, r),
            this.controls[r].setValue(n[r], {
              onlySelf: !0,
              emitEvent: t.emitEvent,
            });
        }),
        this.updateValueAndValidity(t);
    }
    patchValue(n, t = {}) {
      n != null &&
        (Object.keys(n).forEach((r) => {
          let i = this.controls[r];
          i && i.patchValue(n[r], { onlySelf: !0, emitEvent: t.emitEvent });
        }),
        this.updateValueAndValidity(t));
    }
    reset(n = {}, t = {}) {
      this._forEachChild((r, i) => {
        r.reset(n ? n[i] : null, { onlySelf: !0, emitEvent: t.emitEvent });
      }),
        this._updatePristine(t, this),
        this._updateTouched(t, this),
        this.updateValueAndValidity(t);
    }
    getRawValue() {
      return this._reduceChildren(
        {},
        (n, t, r) => ((n[r] = t.getRawValue()), n)
      );
    }
    _syncPendingControls() {
      let n = this._reduceChildren(!1, (t, r) =>
        r._syncPendingControls() ? !0 : t
      );
      return n && this.updateValueAndValidity({ onlySelf: !0 }), n;
    }
    _forEachChild(n) {
      Object.keys(this.controls).forEach((t) => {
        let r = this.controls[t];
        r && n(r, t);
      });
    }
    _setUpControls() {
      this._forEachChild((n) => {
        n.setParent(this),
          n._registerOnCollectionChange(this._onCollectionChange);
      });
    }
    _updateValue() {
      this.value = this._reduceValue();
    }
    _anyControls(n) {
      for (let [t, r] of Object.entries(this.controls))
        if (this.contains(t) && n(r)) return !0;
      return !1;
    }
    _reduceValue() {
      let n = {};
      return this._reduceChildren(
        n,
        (t, r, i) => ((r.enabled || this.disabled) && (t[i] = r.value), t)
      );
    }
    _reduceChildren(n, t) {
      let r = n;
      return (
        this._forEachChild((i, o) => {
          r = t(r, i, o);
        }),
        r
      );
    }
    _allControlsDisabled() {
      for (let n of Object.keys(this.controls))
        if (this.controls[n].enabled) return !1;
      return Object.keys(this.controls).length > 0 || this.disabled;
    }
    _find(n) {
      return this.controls.hasOwnProperty(n) ? this.controls[n] : null;
    }
  };
var Mf = new I("CallSetDisabledState", {
    providedIn: "root",
    factory: () => Tf,
  }),
  Tf = "always";
function OT(e, n) {
  return [...n.path, e];
}
function oD(e, n, t = Tf) {
  sD(e, n),
    n.valueAccessor.writeValue(e.value),
    (e.disabled || t === "always") &&
      n.valueAccessor.setDisabledState?.(e.disabled),
    kT(e, n),
    VT(e, n),
    LT(e, n),
    FT(e, n);
}
function Gv(e, n) {
  e.forEach((t) => {
    t.registerOnValidatorChange && t.registerOnValidatorChange(n);
  });
}
function FT(e, n) {
  if (n.valueAccessor.setDisabledState) {
    let t = (r) => {
      n.valueAccessor.setDisabledState(r);
    };
    e.registerOnDisabledChange(t),
      n._registerOnDestroy(() => {
        e._unregisterOnDisabledChange(t);
      });
  }
}
function sD(e, n) {
  let t = MT(e);
  n.validator !== null
    ? e.setValidators($v(t, n.validator))
    : typeof t == "function" && e.setValidators([t]);
  let r = TT(e);
  n.asyncValidator !== null
    ? e.setAsyncValidators($v(r, n.asyncValidator))
    : typeof r == "function" && e.setAsyncValidators([r]);
  let i = () => e.updateValueAndValidity();
  Gv(n._rawValidators, i), Gv(n._rawAsyncValidators, i);
}
function kT(e, n) {
  n.valueAccessor.registerOnChange((t) => {
    (e._pendingValue = t),
      (e._pendingChange = !0),
      (e._pendingDirty = !0),
      e.updateOn === "change" && aD(e, n);
  });
}
function LT(e, n) {
  n.valueAccessor.registerOnTouched(() => {
    (e._pendingTouched = !0),
      e.updateOn === "blur" && e._pendingChange && aD(e, n),
      e.updateOn !== "submit" && e.markAsTouched();
  });
}
function aD(e, n) {
  e._pendingDirty && e.markAsDirty(),
    e.setValue(e._pendingValue, { emitModelToViewChange: !1 }),
    n.viewToModelUpdate(e._pendingValue),
    (e._pendingChange = !1);
}
function VT(e, n) {
  let t = (r, i) => {
    n.valueAccessor.writeValue(r), i && n.viewToModelUpdate(r);
  };
  e.registerOnChange(t),
    n._registerOnDestroy(() => {
      e._unregisterOnChange(t);
    });
}
function jT(e, n) {
  e == null, sD(e, n);
}
function BT(e, n) {
  if (!e.hasOwnProperty("model")) return !1;
  let t = e.model;
  return t.isFirstChange() ? !0 : !Object.is(n, t.currentValue);
}
function UT(e) {
  return Object.getPrototypeOf(e.constructor) === wl;
}
function $T(e, n) {
  e._syncPendingControls(),
    n.forEach((t) => {
      let r = t.control;
      r.updateOn === "submit" &&
        r._pendingChange &&
        (t.viewToModelUpdate(r._pendingValue), (r._pendingChange = !1));
    });
}
function HT(e, n) {
  if (!n) return null;
  Array.isArray(n);
  let t, r, i;
  return (
    n.forEach((o) => {
      o.constructor === ze ? (t = o) : UT(o) ? (r = o) : (i = o);
    }),
    i || r || t || null
  );
}
var zT = { provide: fi, useExisting: Ot(() => wt) },
  Co = Promise.resolve(),
  wt = (() => {
    class e extends fi {
      callSetDisabledState;
      get submitted() {
        return tn(this.submittedReactive);
      }
      _submitted = Hi(() => this.submittedReactive());
      submittedReactive = Ui(!1);
      _directives = new Set();
      form;
      ngSubmit = new pe();
      options;
      constructor(t, r, i) {
        super(),
          (this.callSetDisabledState = i),
          (this.form = new El({}, If(t), Sf(r)));
      }
      ngAfterViewInit() {
        this._setUpdateStrategy();
      }
      get formDirective() {
        return this;
      }
      get control() {
        return this.form;
      }
      get path() {
        return [];
      }
      get controls() {
        return this.form.controls;
      }
      addControl(t) {
        Co.then(() => {
          let r = this._findContainer(t.path);
          (t.control = r.registerControl(t.name, t.control)),
            oD(t.control, t, this.callSetDisabledState),
            t.control.updateValueAndValidity({ emitEvent: !1 }),
            this._directives.add(t);
        });
      }
      getControl(t) {
        return this.form.get(t.path);
      }
      removeControl(t) {
        Co.then(() => {
          let r = this._findContainer(t.path);
          r && r.removeControl(t.name), this._directives.delete(t);
        });
      }
      addFormGroup(t) {
        Co.then(() => {
          let r = this._findContainer(t.path),
            i = new El({});
          jT(i, t),
            r.registerControl(t.name, i),
            i.updateValueAndValidity({ emitEvent: !1 });
        });
      }
      removeFormGroup(t) {
        Co.then(() => {
          let r = this._findContainer(t.path);
          r && r.removeControl(t.name);
        });
      }
      getFormGroup(t) {
        return this.form.get(t.path);
      }
      updateModel(t, r) {
        Co.then(() => {
          this.form.get(t.path).setValue(r);
        });
      }
      setValue(t) {
        this.control.setValue(t);
      }
      onSubmit(t) {
        return (
          this.submittedReactive.set(!0),
          $T(this.form, this._directives),
          this.ngSubmit.emit(t),
          t?.target?.method === "dialog"
        );
      }
      onReset() {
        this.resetForm();
      }
      resetForm(t = void 0) {
        this.form.reset(t), this.submittedReactive.set(!1);
      }
      _setUpdateStrategy() {
        this.options &&
          this.options.updateOn != null &&
          (this.form._updateOn = this.options.updateOn);
      }
      _findContainer(t) {
        return t.pop(), t.length ? this.form.get(t) : this.form;
      }
      static ɵfac = function (r) {
        return new (r || e)(C(bf, 10), C(Yv, 10), C(Mf, 8));
      };
      static ɵdir = de({
        type: e,
        selectors: [
          ["form", 3, "ngNoForm", "", 3, "formGroup", ""],
          ["ng-form"],
          ["", "ngForm", ""],
        ],
        hostBindings: function (r, i) {
          r & 1 &&
            j("submit", function (s) {
              return i.onSubmit(s);
            })("reset", function () {
              return i.onReset();
            });
        },
        inputs: { options: [0, "ngFormOptions", "options"] },
        outputs: { ngSubmit: "ngSubmit" },
        exportAs: ["ngForm"],
        standalone: !1,
        features: [Mn([zT]), lt],
      });
    }
    return e;
  })();
function qv(e, n) {
  let t = e.indexOf(n);
  t > -1 && e.splice(t, 1);
}
function Wv(e) {
  return (
    typeof e == "object" &&
    e !== null &&
    Object.keys(e).length === 2 &&
    "value" in e &&
    "disabled" in e
  );
}
var GT = class extends _l {
  defaultValue = null;
  _onChange = [];
  _pendingValue;
  _pendingChange = !1;
  constructor(n = null, t, r) {
    super(rD(t), iD(r, t)),
      this._applyFormState(n),
      this._setUpdateStrategy(t),
      this._initObservables(),
      this.updateValueAndValidity({
        onlySelf: !0,
        emitEvent: !!this.asyncValidator,
      }),
      Cl(t) &&
        (t.nonNullable || t.initialValueIsDefault) &&
        (Wv(n) ? (this.defaultValue = n.value) : (this.defaultValue = n));
  }
  setValue(n, t = {}) {
    (this.value = this._pendingValue = n),
      this._onChange.length &&
        t.emitModelToViewChange !== !1 &&
        this._onChange.forEach((r) =>
          r(this.value, t.emitViewToModelChange !== !1)
        ),
      this.updateValueAndValidity(t);
  }
  patchValue(n, t = {}) {
    this.setValue(n, t);
  }
  reset(n = this.defaultValue, t = {}) {
    this._applyFormState(n),
      this.markAsPristine(t),
      this.markAsUntouched(t),
      this.setValue(this.value, t),
      (this._pendingChange = !1);
  }
  _updateValue() {}
  _anyControls(n) {
    return !1;
  }
  _allControlsDisabled() {
    return this.disabled;
  }
  registerOnChange(n) {
    this._onChange.push(n);
  }
  _unregisterOnChange(n) {
    qv(this._onChange, n);
  }
  registerOnDisabledChange(n) {
    this._onDisabledChange.push(n);
  }
  _unregisterOnDisabledChange(n) {
    qv(this._onDisabledChange, n);
  }
  _forEachChild(n) {}
  _syncPendingControls() {
    return this.updateOn === "submit" &&
      (this._pendingDirty && this.markAsDirty(),
      this._pendingTouched && this.markAsTouched(),
      this._pendingChange)
      ? (this.setValue(this._pendingValue, {
          onlySelf: !0,
          emitModelToViewChange: !1,
        }),
        !0)
      : !1;
  }
  _applyFormState(n) {
    Wv(n)
      ? ((this.value = this._pendingValue = n.value),
        n.disabled
          ? this.disable({ onlySelf: !0, emitEvent: !1 })
          : this.enable({ onlySelf: !0, emitEvent: !1 }))
      : (this.value = this._pendingValue = n);
  }
};
var qT = { provide: So, useExisting: Ot(() => tt) },
  Qv = Promise.resolve(),
  tt = (() => {
    class e extends So {
      _changeDetectorRef;
      callSetDisabledState;
      control = new GT();
      static ngAcceptInputType_isDisabled;
      _registered = !1;
      viewModel;
      name = "";
      isDisabled;
      model;
      options;
      update = new pe();
      constructor(t, r, i, o, s, a) {
        super(),
          (this._changeDetectorRef = s),
          (this.callSetDisabledState = a),
          (this._parent = t),
          this._setValidators(r),
          this._setAsyncValidators(i),
          (this.valueAccessor = HT(this, o));
      }
      ngOnChanges(t) {
        if ((this._checkForErrors(), !this._registered || "name" in t)) {
          if (this._registered && (this._checkName(), this.formDirective)) {
            let r = t.name.previousValue;
            this.formDirective.removeControl({
              name: r,
              path: this._getPath(r),
            });
          }
          this._setUpControl();
        }
        "isDisabled" in t && this._updateDisabled(t),
          BT(t, this.viewModel) &&
            (this._updateValue(this.model), (this.viewModel = this.model));
      }
      ngOnDestroy() {
        this.formDirective && this.formDirective.removeControl(this);
      }
      get path() {
        return this._getPath(this.name);
      }
      get formDirective() {
        return this._parent ? this._parent.formDirective : null;
      }
      viewToModelUpdate(t) {
        (this.viewModel = t), this.update.emit(t);
      }
      _setUpControl() {
        this._setUpdateStrategy(),
          this._isStandalone()
            ? this._setUpStandalone()
            : this.formDirective.addControl(this),
          (this._registered = !0);
      }
      _setUpdateStrategy() {
        this.options &&
          this.options.updateOn != null &&
          (this.control._updateOn = this.options.updateOn);
      }
      _isStandalone() {
        return !this._parent || !!(this.options && this.options.standalone);
      }
      _setUpStandalone() {
        oD(this.control, this, this.callSetDisabledState),
          this.control.updateValueAndValidity({ emitEvent: !1 });
      }
      _checkForErrors() {
        this._isStandalone() || this._checkParentType(), this._checkName();
      }
      _checkParentType() {}
      _checkName() {
        this.options && this.options.name && (this.name = this.options.name),
          !this._isStandalone() && this.name;
      }
      _updateValue(t) {
        Qv.then(() => {
          this.control.setValue(t, { emitViewToModelChange: !1 }),
            this._changeDetectorRef?.markForCheck();
        });
      }
      _updateDisabled(t) {
        let r = t.isDisabled.currentValue,
          i = r !== 0 && Tn(r);
        Qv.then(() => {
          i && !this.control.disabled
            ? this.control.disable()
            : !i && this.control.disabled && this.control.enable(),
            this._changeDetectorRef?.markForCheck();
        });
      }
      _getPath(t) {
        return this._parent ? OT(t, this._parent) : [t];
      }
      static ɵfac = function (r) {
        return new (r || e)(
          C(fi, 9),
          C(bf, 10),
          C(Yv, 10),
          C(Mo, 10),
          C(ir, 8),
          C(Mf, 8)
        );
      };
      static ɵdir = de({
        type: e,
        selectors: [
          ["", "ngModel", "", 3, "formControlName", "", 3, "formControl", ""],
        ],
        inputs: {
          name: "name",
          isDisabled: [0, "disabled", "isDisabled"],
          model: [0, "ngModel", "model"],
          options: [0, "ngModelOptions", "options"],
        },
        outputs: { update: "ngModelChange" },
        exportAs: ["ngModel"],
        standalone: !1,
        features: [Mn([qT]), lt, Xn],
      });
    }
    return e;
  })(),
  Bt = (() => {
    class e {
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵdir = de({
        type: e,
        selectors: [["form", 3, "ngNoForm", "", 3, "ngNativeValidate", ""]],
        hostAttrs: ["novalidate", ""],
        standalone: !1,
      });
    }
    return e;
  })(),
  WT = { provide: Mo, useExisting: Ot(() => To), multi: !0 },
  To = (() => {
    class e extends wl {
      writeValue(t) {
        let r = t ?? "";
        this.setProperty("value", r);
      }
      registerOnChange(t) {
        this.onChange = (r) => {
          t(r == "" ? null : parseFloat(r));
        };
      }
      static ɵfac = (() => {
        let t;
        return function (i) {
          return (t || (t = Yt(e)))(i || e);
        };
      })();
      static ɵdir = de({
        type: e,
        selectors: [
          ["input", "type", "number", "formControlName", ""],
          ["input", "type", "number", "formControl", ""],
          ["input", "type", "number", "ngModel", ""],
        ],
        hostBindings: function (r, i) {
          r & 1 &&
            j("input", function (s) {
              return i.onChange(s.target.value);
            })("blur", function () {
              return i.onTouched();
            });
        },
        standalone: !1,
        features: [Mn([WT]), lt],
      });
    }
    return e;
  })();
var QT = { provide: Mo, useExisting: Ot(() => pi), multi: !0 };
function lD(e, n) {
  return e == null
    ? `${n}`
    : (n && typeof n == "object" && (n = "Object"), `${e}: ${n}`.slice(0, 50));
}
function ZT(e) {
  return e.split(":")[0];
}
var pi = (() => {
    class e extends wl {
      value;
      _optionMap = new Map();
      _idCounter = 0;
      set compareWith(t) {
        this._compareWith = t;
      }
      _compareWith = Object.is;
      writeValue(t) {
        this.value = t;
        let r = this._getOptionId(t),
          i = lD(r, t);
        this.setProperty("value", i);
      }
      registerOnChange(t) {
        this.onChange = (r) => {
          (this.value = this._getOptionValue(r)), t(this.value);
        };
      }
      _registerOption() {
        return (this._idCounter++).toString();
      }
      _getOptionId(t) {
        for (let r of this._optionMap.keys())
          if (this._compareWith(this._optionMap.get(r), t)) return r;
        return null;
      }
      _getOptionValue(t) {
        let r = ZT(t);
        return this._optionMap.has(r) ? this._optionMap.get(r) : t;
      }
      static ɵfac = (() => {
        let t;
        return function (i) {
          return (t || (t = Yt(e)))(i || e);
        };
      })();
      static ɵdir = de({
        type: e,
        selectors: [
          ["select", "formControlName", "", 3, "multiple", ""],
          ["select", "formControl", "", 3, "multiple", ""],
          ["select", "ngModel", "", 3, "multiple", ""],
        ],
        hostBindings: function (r, i) {
          r & 1 &&
            j("change", function (s) {
              return i.onChange(s.target.value);
            })("blur", function () {
              return i.onTouched();
            });
        },
        inputs: { compareWith: "compareWith" },
        standalone: !1,
        features: [Mn([QT]), lt],
      });
    }
    return e;
  })(),
  bl = (() => {
    class e {
      _element;
      _renderer;
      _select;
      id;
      constructor(t, r, i) {
        (this._element = t),
          (this._renderer = r),
          (this._select = i),
          this._select && (this.id = this._select._registerOption());
      }
      set ngValue(t) {
        this._select != null &&
          (this._select._optionMap.set(this.id, t),
          this._setElementValue(lD(this.id, t)),
          this._select.writeValue(this._select.value));
      }
      set value(t) {
        this._setElementValue(t),
          this._select && this._select.writeValue(this._select.value);
      }
      _setElementValue(t) {
        this._renderer.setProperty(this._element.nativeElement, "value", t);
      }
      ngOnDestroy() {
        this._select &&
          (this._select._optionMap.delete(this.id),
          this._select.writeValue(this._select.value));
      }
      static ɵfac = function (r) {
        return new (r || e)(C(Dt), C(Ft), C(pi, 9));
      };
      static ɵdir = de({
        type: e,
        selectors: [["option"]],
        inputs: { ngValue: "ngValue", value: "value" },
        standalone: !1,
      });
    }
    return e;
  })(),
  KT = { provide: Mo, useExisting: Ot(() => cD), multi: !0 };
function Zv(e, n) {
  return e == null
    ? `${n}`
    : (typeof n == "string" && (n = `'${n}'`),
      n && typeof n == "object" && (n = "Object"),
      `${e}: ${n}`.slice(0, 50));
}
function YT(e) {
  return e.split(":")[0];
}
var cD = (() => {
    class e extends wl {
      value;
      _optionMap = new Map();
      _idCounter = 0;
      set compareWith(t) {
        this._compareWith = t;
      }
      _compareWith = Object.is;
      writeValue(t) {
        this.value = t;
        let r;
        if (Array.isArray(t)) {
          let i = t.map((o) => this._getOptionId(o));
          r = (o, s) => {
            o._setSelected(i.indexOf(s.toString()) > -1);
          };
        } else
          r = (i, o) => {
            i._setSelected(!1);
          };
        this._optionMap.forEach(r);
      }
      registerOnChange(t) {
        this.onChange = (r) => {
          let i = [],
            o = r.selectedOptions;
          if (o !== void 0) {
            let s = o;
            for (let a = 0; a < s.length; a++) {
              let l = s[a],
                c = this._getOptionValue(l.value);
              i.push(c);
            }
          } else {
            let s = r.options;
            for (let a = 0; a < s.length; a++) {
              let l = s[a];
              if (l.selected) {
                let c = this._getOptionValue(l.value);
                i.push(c);
              }
            }
          }
          (this.value = i), t(i);
        };
      }
      _registerOption(t) {
        let r = (this._idCounter++).toString();
        return this._optionMap.set(r, t), r;
      }
      _getOptionId(t) {
        for (let r of this._optionMap.keys())
          if (this._compareWith(this._optionMap.get(r)._value, t)) return r;
        return null;
      }
      _getOptionValue(t) {
        let r = YT(t);
        return this._optionMap.has(r) ? this._optionMap.get(r)._value : t;
      }
      static ɵfac = (() => {
        let t;
        return function (i) {
          return (t || (t = Yt(e)))(i || e);
        };
      })();
      static ɵdir = de({
        type: e,
        selectors: [
          ["select", "multiple", "", "formControlName", ""],
          ["select", "multiple", "", "formControl", ""],
          ["select", "multiple", "", "ngModel", ""],
        ],
        hostBindings: function (r, i) {
          r & 1 &&
            j("change", function (s) {
              return i.onChange(s.target);
            })("blur", function () {
              return i.onTouched();
            });
        },
        inputs: { compareWith: "compareWith" },
        standalone: !1,
        features: [Mn([KT]), lt],
      });
    }
    return e;
  })(),
  Il = (() => {
    class e {
      _element;
      _renderer;
      _select;
      id;
      _value;
      constructor(t, r, i) {
        (this._element = t),
          (this._renderer = r),
          (this._select = i),
          this._select && (this.id = this._select._registerOption(this));
      }
      set ngValue(t) {
        this._select != null &&
          ((this._value = t),
          this._setElementValue(Zv(this.id, t)),
          this._select.writeValue(this._select.value));
      }
      set value(t) {
        this._select
          ? ((this._value = t),
            this._setElementValue(Zv(this.id, t)),
            this._select.writeValue(this._select.value))
          : this._setElementValue(t);
      }
      _setElementValue(t) {
        this._renderer.setProperty(this._element.nativeElement, "value", t);
      }
      _setSelected(t) {
        this._renderer.setProperty(this._element.nativeElement, "selected", t);
      }
      ngOnDestroy() {
        this._select &&
          (this._select._optionMap.delete(this.id),
          this._select.writeValue(this._select.value));
      }
      static ɵfac = function (r) {
        return new (r || e)(C(Dt), C(Ft), C(cD, 9));
      };
      static ɵdir = de({
        type: e,
        selectors: [["option"]],
        inputs: { ngValue: "ngValue", value: "value" },
        standalone: !1,
      });
    }
    return e;
  })();
var JT = (() => {
  class e {
    _validator = Uv;
    _onChange;
    _enabled;
    ngOnChanges(t) {
      if (this.inputName in t) {
        let r = this.normalizeInput(t[this.inputName].currentValue);
        (this._enabled = this.enabled(r)),
          (this._validator = this._enabled ? this.createValidator(r) : Uv),
          this._onChange && this._onChange();
      }
    }
    validate(t) {
      return this._validator(t);
    }
    registerOnValidatorChange(t) {
      this._onChange = t;
    }
    enabled(t) {
      return t != null;
    }
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵdir = de({ type: e, features: [Xn] });
  }
  return e;
})();
var XT = { provide: bf, useExisting: Ot(() => Ct), multi: !0 };
var Ct = (() => {
  class e extends JT {
    required;
    inputName = "required";
    normalizeInput = Tn;
    createValidator = (t) => CT;
    enabled(t) {
      return t;
    }
    static ɵfac = (() => {
      let t;
      return function (i) {
        return (t || (t = Yt(e)))(i || e);
      };
    })();
    static ɵdir = de({
      type: e,
      selectors: [
        ["", "required", "", "formControlName", "", 3, "type", "checkbox"],
        ["", "required", "", "formControl", "", 3, "type", "checkbox"],
        ["", "required", "", "ngModel", "", 3, "type", "checkbox"],
      ],
      hostVars: 1,
      hostBindings: function (r, i) {
        r & 2 && $i("required", i._enabled ? "" : null);
      },
      inputs: { required: "required" },
      standalone: !1,
      features: [Mn([XT]), lt],
    });
  }
  return e;
})();
var eA = (() => {
  class e {
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵmod = Se({ type: e });
    static ɵinj = Ie({});
  }
  return e;
})();
var uD = (() => {
  class e {
    static withConfig(t) {
      return {
        ngModule: e,
        providers: [{ provide: Mf, useValue: t.callSetDisabledState ?? Tf }],
      };
    }
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵmod = Se({ type: e });
    static ɵinj = Ie({ imports: [eA] });
  }
  return e;
})();
var dD = (() => {
  class e {
    constructor(t, r) {
      (this.authService = t),
        (this.router = r),
        (this.email = ""),
        (this.password = "");
    }
    onSubmit() {
      let t = { email: this.email, password: this.password };
      this.authService.login(t).subscribe({
        next: (r) => {
          console.log("Login successful:", r),
            this.router.navigate(["/"]),
            localStorage.setItem("token", r.token),
            localStorage.setItem("user", JSON.stringify(r.data)),
            localStorage.setItem("role", JSON.stringify(r.role));
        },
        error: (r) => {
          console.error("Error during login:", r.error.non_field_errors[0]),
            alert("Login failed!");
        },
      });
    }
    static {
      this.ɵfac = function (r) {
        return new (r || e)(C(dt), C(ce));
      };
    }
    static {
      this.ɵcmp = J({
        type: e,
        selectors: [["app-login"]],
        standalone: !1,
        decls: 24,
        vars: 2,
        consts: [
          [1, "container", "my-5"],
          [1, "row", "justify-content-center"],
          [1, "col-12", "col-md-6"],
          [
            "src",
            "https://img.freepik.com/free-vector/login-concept-illustration_114360-748.jpg?t=st=1732129769~exp=1732133369~hmac=4a6270f18eb4c5face45d6f5a0297ce54b45c30b862b9d7b960b8e3f70c247e1&w=740",
            "alt",
            "",
            1,
            "img-fluid",
          ],
          [1, "col-12", "col-md-6", "my-5"],
          [1, "card", "border-0"],
          [1, "card-body", "p-5"],
          [1, "text-center", "my-4"],
          [3, "ngSubmit"],
          [1, "mb-3"],
          ["for", "exampleInputEmail1", 1, "form-label"],
          [
            "type",
            "email",
            "id",
            "exampleInputEmail1",
            "aria-describedby",
            "emailHelp",
            "name",
            "email",
            "placeholder",
            "Enter your email",
            "required",
            "",
            1,
            "form-control",
            3,
            "ngModelChange",
            "ngModel",
          ],
          ["for", "exampleInputPassword1", 1, "form-label"],
          [
            "type",
            "password",
            "id",
            "exampleInputPassword1",
            "name",
            "password",
            "placeholder",
            "Enter your password",
            "required",
            "",
            1,
            "form-control",
            3,
            "ngModelChange",
            "ngModel",
          ],
          [1, "d-flex", "justify-content-center"],
          ["type", "submit", 1, "btn", "btn-outline-danger"],
          [1, "text-center", "mt-3"],
          [
            "routerLink",
            "/register",
            1,
            "text-decoration-none",
            "text-secondary",
          ],
        ],
        template: function (r, i) {
          r & 1 &&
            (p(0, "div", 0)(1, "div", 1)(2, "div", 2),
            V(3, "img", 3),
            g(),
            p(4, "div", 4)(5, "div", 5)(6, "div", 6)(7, "h3", 7),
            _(8, "Login"),
            g(),
            p(9, "form", 8),
            j("ngSubmit", function () {
              return i.onSubmit();
            }),
            p(10, "div", 9)(11, "label", 10),
            _(12, "Email Address"),
            g(),
            p(13, "input", 11),
            he("ngModelChange", function (s) {
              return ge(i.email, s) || (i.email = s), s;
            }),
            g()(),
            p(14, "div", 9)(15, "label", 12),
            _(16, "Password"),
            g(),
            p(17, "input", 13),
            he("ngModelChange", function (s) {
              return ge(i.password, s) || (i.password = s), s;
            }),
            g()(),
            p(18, "div", 14)(19, "button", 15),
            _(20, "login"),
            g()(),
            p(21, "div", 16)(22, "a", 17),
            _(23, "Create an Account"),
            g()()()()()()()()),
            r & 2 &&
              (A(13), fe("ngModel", i.email), A(4), fe("ngModel", i.password));
        },
        dependencies: [Vt, Bt, ze, ft, jt, Ct, tt, wt],
        encapsulation: 2,
      });
    }
  }
  return e;
})();
var fD = (() => {
  class e {
    constructor(t, r) {
      (this.authService = t),
        (this.router = r),
        (this.username = ""),
        (this.email = ""),
        (this.password = "");
    }
    onSubmit() {
      let t = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      this.authService.register(t).subscribe({
        next: (r) => {
          console.log("Registration successful:", r),
            this.router.navigate(["/login"]);
        },
        error: (r) => {
          console.error("Error during registration:", r),
            alert("Registration failed!");
        },
      });
    }
    static {
      this.ɵfac = function (r) {
        return new (r || e)(C(dt), C(ce));
      };
    }
    static {
      this.ɵcmp = J({
        type: e,
        selectors: [["app-register"]],
        standalone: !1,
        decls: 28,
        vars: 3,
        consts: [
          [1, "container", "my-5"],
          [1, "row", "justify-content-center"],
          [1, "col-12", "col-md-6", "col-lg-6", "my-5"],
          [1, "card", "border-0"],
          [1, "card-body", "p-5"],
          [1, "text-center", "mb-4"],
          [3, "ngSubmit"],
          [1, "mb-3"],
          ["for", "exampleInputname", 1, "form-label"],
          [
            "type",
            "text",
            "id",
            "exampleInputname",
            "name",
            "username",
            "placeholder",
            "Enter your username",
            "required",
            "",
            1,
            "form-control",
            3,
            "ngModelChange",
            "ngModel",
          ],
          ["for", "exampleInputEmail1", 1, "form-label"],
          [
            "type",
            "email",
            "id",
            "exampleInputEmail1",
            "name",
            "email",
            "placeholder",
            "Enter your email",
            "required",
            "",
            1,
            "form-control",
            3,
            "ngModelChange",
            "ngModel",
          ],
          ["for", "exampleInputPassword1", 1, "form-label"],
          [
            "type",
            "password",
            "id",
            "exampleInputPassword1",
            "name",
            "password",
            "placeholder",
            "Enter your password",
            "required",
            "",
            1,
            "form-control",
            3,
            "ngModelChange",
            "ngModel",
          ],
          [1, "d-flex", "justify-content-center"],
          ["type", "submit", 1, "btn", "btn-outline-danger"],
          [1, "text-center", "mt-3"],
          ["routerLink", "/login", 1, "text-decoration-none", "text-secondary"],
          [1, "col-12", "col-md-6", "col-lg-6"],
          [
            "src",
            "https://img.freepik.com/free-vector/add-user-concept-illustration_114360-557.jpg?t=st=1732129538~exp=1732133138~hmac=5b4cabaa190111d4f63dcb5ab918b6e757c155fbb5ac051e93c73238f82625e4&w=740",
            "alt",
            "",
            1,
            "img-fluid",
          ],
        ],
        template: function (r, i) {
          r & 1 &&
            (p(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(
              5,
              "h3",
              5
            ),
            _(6, "Register"),
            g(),
            p(7, "form", 6),
            j("ngSubmit", function () {
              return i.onSubmit();
            }),
            p(8, "div", 7)(9, "label", 8),
            _(10, "Username"),
            g(),
            p(11, "input", 9),
            he("ngModelChange", function (s) {
              return ge(i.username, s) || (i.username = s), s;
            }),
            g()(),
            p(12, "div", 7)(13, "label", 10),
            _(14, "Email Address"),
            g(),
            p(15, "input", 11),
            he("ngModelChange", function (s) {
              return ge(i.email, s) || (i.email = s), s;
            }),
            g()(),
            p(16, "div", 7)(17, "label", 12),
            _(18, "Password"),
            g(),
            p(19, "input", 13),
            he("ngModelChange", function (s) {
              return ge(i.password, s) || (i.password = s), s;
            }),
            g()(),
            p(20, "div", 14)(21, "button", 15),
            _(22, "Register"),
            g()(),
            p(23, "div", 16)(24, "a", 17),
            _(25, "Already have an account? Login here"),
            g()()()()()(),
            p(26, "div", 18),
            V(27, "img", 19),
            g()()()),
            r & 2 &&
              (A(11),
              fe("ngModel", i.username),
              A(4),
              fe("ngModel", i.email),
              A(4),
              fe("ngModel", i.password));
        },
        dependencies: [Vt, Bt, ze, ft, jt, Ct, tt, wt],
        encapsulation: 2,
      });
    }
  }
  return e;
})();
var Ge = (() => {
  class e {
    constructor(t) {
      this.http = t;
    }
    getProducts(t) {
      return this.http.get(t);
    }
    getProduct(t) {
      return this.http.get(
        `https://furniture-production-4fc8.up.railway.app/products/${t}`
      );
    }
    getProductDetails(t) {
      let r = localStorage.getItem("token");
      return this.http.get(
        `https://furniture-production-4fc8.up.railway.app/products/${t}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${r}`,
          },
        }
      );
    }
    deleteProduct(t) {
      let r = localStorage.getItem("token");
      return this.http.delete(
        `https://furniture-production-4fc8.up.railway.app/products/delete/${t}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${r}`,
          },
        }
      );
    }
    updateProduct(t, r) {
      let i = localStorage.getItem("token");
      return this.http.put(
        `https://furniture-production-4fc8.up.railway.app/products/update/${t}/`,
        r,
        { headers: { Authorization: `Token ${i}` } }
      );
    }
    createProduct(t) {
      let r = localStorage.getItem("token");
      return this.http.post(
        "https://furniture-production-4fc8.up.railway.app/products/create/",
        t,
        { headers: { Authorization: `Token ${r}` } }
      );
    }
    searchByName(t) {
      return this.http.get(
        `https://furniture-production-4fc8.up.railway.app/productsByName/?name=${t}`
      );
    }
    searchByCategory(t) {
      return this.http.get(
        `https://furniture-production-4fc8.up.railway.app/productsByCategory/?category=${t}`
      );
    }
    static {
      this.ɵfac = function (r) {
        return new (r || e)(M(Ki));
      };
    }
    static {
      this.ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
  }
  return e;
})();
var Sl = (() => {
  class e {
    constructor(t) {
      (this.productsService = t),
        (this.name = ""),
        (this.searchResults = new pe());
    }
    search() {
      if (!this.name.trim()) {
        this.searchResults.emit([]);
        return;
      }
      this.productsService.searchByName(this.name).subscribe({
        next: (t) => {
          console.log(t), this.searchResults.emit(t);
        },
        error: () => {
          this.searchResults.emit([]);
        },
      });
    }
    static {
      this.ɵfac = function (r) {
        return new (r || e)(C(Ge));
      };
    }
    static {
      this.ɵcmp = J({
        type: e,
        selectors: [["app-search-by-name"]],
        outputs: { searchResults: "searchResults" },
        standalone: !1,
        decls: 4,
        vars: 1,
        consts: [
          [1, "d-flex", "justify-content-center", "my-3"],
          [
            "type",
            "text",
            "placeholder",
            "Search product by name",
            1,
            "form-control",
            "me-2",
            "bg-transparent",
            "text-dark",
            3,
            "ngModelChange",
            "ngModel",
          ],
          ["type", "button", 1, "btn", "btn-outline-success", 3, "click"],
        ],
        template: function (r, i) {
          r & 1 &&
            (p(0, "div", 0)(1, "input", 1),
            he("ngModelChange", function (s) {
              return ge(i.name, s) || (i.name = s), s;
            }),
            g(),
            p(2, "button", 2),
            j("click", function () {
              return i.search();
            }),
            _(3, "Search"),
            g()()),
            r & 2 && (A(), fe("ngModel", i.name));
        },
        dependencies: [ze, ft, tt],
        encapsulation: 2,
      });
    }
  }
  return e;
})();
var pD = (() => {
  class e {
    constructor(t) {
      (this.productsService = t), (this.searchResults = new pe());
    }
    search(t) {
      this.productsService.searchByCategory(t).subscribe({
        next: (r) => {
          console.log(r), this.searchResults.emit(r);
        },
        error: () => {
          this.searchResults.emit([]);
        },
      });
    }
    static {
      this.ɵfac = function (r) {
        return new (r || e)(C(Ge));
      };
    }
    static {
      this.ɵcmp = J({
        type: e,
        selectors: [["app-search-by-category"]],
        outputs: { searchResults: "searchResults" },
        standalone: !1,
        decls: 16,
        vars: 0,
        consts: [
          [
            1,
            "row",
            "row-cols-1",
            "row-cols-md-5",
            "g-2",
            "my-5",
            "justify-content-center",
          ],
          [1, "col", "d-flex", "justify-content-center"],
          [
            "type",
            "button",
            1,
            "btn",
            "btn-outline-success",
            "w-75",
            "mx-auto",
            "d-flex",
            "justify-content-center",
            "align-items-center",
            3,
            "click",
          ],
          [1, "fa", "fa-couch"],
          [
            "type",
            "button",
            1,
            "btn",
            "btn-outline-primary",
            "w-75",
            "d-flex",
            "justify-content-center",
            "align-items-center",
            3,
            "click",
          ],
          [1, "fa", "fa-bed"],
          [
            "type",
            "button",
            1,
            "btn",
            "btn-outline-secondary",
            "w-75",
            "d-flex",
            "justify-content-center",
            "align-items-center",
            3,
            "click",
          ],
          [1, "fa", "fa-chair"],
          [
            "type",
            "button",
            1,
            "btn",
            "btn-outline-info",
            "w-75",
            "d-flex",
            "justify-content-center",
            "align-items-center",
            3,
            "click",
          ],
          [1, "fa", "fa-utensils"],
          [
            "type",
            "button",
            1,
            "btn",
            "btn-outline-danger",
            "w-75",
            "d-flex",
            "justify-content-center",
            "align-items-center",
            3,
            "click",
          ],
          [1, "fa", "fa-tree"],
        ],
        template: function (r, i) {
          r & 1 &&
            (p(0, "div", 0)(1, "div", 1)(2, "button", 2),
            j("click", function () {
              return i.search("Living Room");
            }),
            V(3, "i", 3),
            g()(),
            p(4, "div", 1)(5, "button", 4),
            j("click", function () {
              return i.search("Bedroom");
            }),
            V(6, "i", 5),
            g()(),
            p(7, "div", 1)(8, "button", 6),
            j("click", function () {
              return i.search("Office");
            }),
            V(9, "i", 7),
            g()(),
            p(10, "div", 1)(11, "button", 8),
            j("click", function () {
              return i.search("Dining");
            }),
            V(12, "i", 9),
            g()(),
            p(13, "div", 1)(14, "button", 10),
            j("click", function () {
              return i.search("Outdoor");
            }),
            V(15, "i", 11),
            g()()());
        },
        encapsulation: 2,
      });
    }
  }
  return e;
})();
var nA = (e) => ({ animationDelay: e });
function rA(e, n) {
  e & 1 &&
    (p(0, "div", 7)(1, "div", 8)(2, "span", 9),
    _(3, "Loading..."),
    g()(),
    p(4, "div", 10)(5, "span", 9),
    _(6, "Loading..."),
    g()(),
    p(7, "div", 11)(8, "span", 9),
    _(9, "Loading..."),
    g()()());
}
function iA(e, n) {
  if (
    (e & 1 &&
      (p(0, "div", 14)(1, "div", 15),
      V(2, "img", 16),
      p(3, "div", 17)(4, "h5", 18),
      _(5),
      g(),
      p(6, "p"),
      _(7),
      g(),
      p(8, "p", 19),
      _(9),
      g(),
      p(10, "div", 20)(11, "a", 21),
      _(12, "Details"),
      g()()()()()),
    e & 2)
  ) {
    let t = n.$implicit,
      r = n.index;
    re("ngStyle", Ym(8, nA, r * 0.2 + "s")),
      A(2),
      Qr("src", t.image, tr),
      Qr("alt", t.name),
      A(3),
      Je(t.name),
      A(2),
      Je(t.category),
      A(2),
      Je(t.price),
      A(2),
      Zr("routerLink", "/product/", t.id, "");
  }
}
function oA(e, n) {
  if ((e & 1 && (p(0, "div", 12), He(1, iA, 13, 10, "div", 13), g()), e & 2)) {
    let t = Wr();
    A(), re("ngForOf", t.products);
  }
}
var gD = (() => {
  class e {
    constructor(t) {
      (this.productsService = t),
        (this.products = []),
        (this.nextPage = null),
        (this.previousPage = null),
        (this.loading = !0);
    }
    ngOnInit() {
      this.fetchProducts();
    }
    handleSearchResults(t) {
      t.length > 0 ? (this.products = t) : this.fetchProducts();
    }
    fetchProducts(t = null) {
      console.log("Fetching products...", t);
      let r = t || "https://furniture-production-4fc8.up.railway.app/products/";
      r.startsWith("http://") && (r = r.replace("http://", "https://")),
        this.productsService.getProducts(r).subscribe({
          next: (i) => {
            console.log("Products:", i),
              (this.products = i.results),
              (this.nextPage = i.next),
              (this.previousPage = i.previous),
              (this.loading = !1);
          },
          error: (i) => {
            console.error("Error fetching products:", i), (this.loading = !1);
          },
        });
    }
    nextPageHandler() {
      this.nextPage && this.fetchProducts(this.nextPage);
    }
    previousPageHandler() {
      this.previousPage && this.fetchProducts(this.previousPage);
    }
    static {
      this.ɵfac = function (r) {
        return new (r || e)(C(Ge));
      };
    }
    static {
      this.ɵcmp = J({
        type: e,
        selectors: [["app-products"]],
        standalone: !1,
        decls: 11,
        vars: 4,
        consts: [
          [1, "container", "my-4"],
          [1, "d-flex", "justify-content-between", "align-items-center"],
          [3, "searchResults"],
          [
            "class",
            "d-flex justify-content-center align-items-center vh-50",
            4,
            "ngIf",
          ],
          ["class", "row row-cols-1 row-cols-md-3 g-4", 4, "ngIf"],
          [1, "d-flex", "justify-content-between", "mt-4"],
          [1, "btn", "btn-primary", 3, "click", "disabled"],
          [
            1,
            "d-flex",
            "justify-content-center",
            "align-items-center",
            "vh-50",
          ],
          ["role", "status", 1, "spinner-border", "text-primary"],
          [1, "visually-hidden"],
          ["role", "status", 1, "spinner-border", "text-danger", "mx-3"],
          ["role", "status", 1, "spinner-border", "text-success"],
          [1, "row", "row-cols-1", "row-cols-md-3", "g-4"],
          ["class", "fade-in-up", 3, "ngStyle", 4, "ngFor", "ngForOf"],
          [1, "fade-in-up", 3, "ngStyle"],
          [1, "card", "h-100"],
          [1, "card-img-top", "p-4", 3, "src", "alt"],
          [1, "card-body", "text-center"],
          [1, "card-title"],
          [1, "card-text"],
          [1, "d-flex", "justify-content-center", "btn", "btn-info"],
          [1, "text-white", "text-decoration-none", 3, "routerLink"],
        ],
        template: function (r, i) {
          r & 1 &&
            (p(0, "div", 0)(1, "div", 1)(2, "app-search-by-name", 2),
            j("searchResults", function (s) {
              return i.handleSearchResults(s);
            }),
            g(),
            p(3, "app-search-by-category", 2),
            j("searchResults", function (s) {
              return i.handleSearchResults(s);
            }),
            g()(),
            He(4, rA, 10, 0, "div", 3)(5, oA, 2, 1, "div", 4),
            p(6, "div", 5)(7, "button", 6),
            j("click", function () {
              return i.previousPageHandler();
            }),
            _(8, "Previous"),
            g(),
            p(9, "button", 6),
            j("click", function () {
              return i.nextPageHandler();
            }),
            _(10, "Next"),
            g()()()),
            r & 2 &&
              (A(4),
              re("ngIf", i.loading),
              A(),
              re("ngIf", !i.loading),
              A(2),
              re("disabled", !i.previousPage),
              A(2),
              re("disabled", !i.nextPage));
        },
        dependencies: [An, Xr, _y, Vt, Sl, pD],
        styles: [
          ".card[_ngcontent-%COMP%]:hover{transform:scale(1.05);transition:all .3s ease-in-out}.fade-in-up[_ngcontent-%COMP%]{opacity:0;transform:translate(50px) translateY(-50px);animation:_ngcontent-%COMP%_fadeInUp .8s ease-out forwards}@keyframes _ngcontent-%COMP%_fadeInUp{to{opacity:1;transform:translateY(0)}}",
        ],
      });
    }
  }
  return e;
})();
var mD = (() => {
  class e {
    constructor(t, r) {
      (this.route = t), (this.productsService = r), (this.product = {});
    }
    ngOnInit() {
      this.route.paramMap.subscribe((t) => {
        let r = t.get("id");
        r && ((this.productId = +r), this.fetchProductDetails(this.productId));
      });
    }
    fetchProductDetails(t) {
      this.productsService.getProductDetails(t).subscribe({
        next: (r) => {
          console.log("Product details:", r), (this.product = r);
        },
        error: (r) => {
          console.error("Error fetching product details:", r);
        },
      });
    }
    static {
      this.ɵfac = function (r) {
        return new (r || e)(C(Et), C(Ge));
      };
    }
    static {
      this.ɵcmp = J({
        type: e,
        selectors: [["app-product-details"]],
        standalone: !1,
        decls: 12,
        vars: 6,
        consts: [
          [
            1,
            "d-flex",
            "justify-content-center",
            "align-items-center",
            "vh-100",
            "bg-light",
          ],
          [
            1,
            "card",
            "text-center",
            "p-4",
            "shadow",
            2,
            "max-width",
            "400px",
            "width",
            "100%",
          ],
          ["alt", "...", 1, "card-img-top", 3, "src"],
          [1, "card-title"],
          [1, "card-text"],
        ],
        template: function (r, i) {
          r & 1 &&
            (p(0, "div", 0)(1, "div", 1),
            V(2, "img", 2),
            p(3, "h1", 3),
            _(4),
            g(),
            p(5, "p", 4),
            _(6),
            g(),
            p(7, "p", 4),
            _(8, "Price: "),
            p(9, "strong"),
            _(10),
            xa(11, "currency"),
            g()()()()),
            r & 2 &&
              (A(2),
              Qr("src", i.product.image, tr),
              A(2),
              Je(i.product.name),
              A(2),
              Je(i.product.description),
              A(4),
              Je(Ra(11, 4, i.product.price)));
        },
        dependencies: [Va],
        encapsulation: 2,
      });
    }
  }
  return e;
})();
function sA(e, n) {
  if ((e & 1 && (p(0, "option", 21), _(1), g()), e & 2)) {
    let t = n.$implicit;
    re("value", t), A(), Kr(" ", t, " ");
  }
}
var yD = (() => {
  class e {
    constructor(t, r, i) {
      (this.route = t),
        (this.productsService = r),
        (this.router = i),
        (this.product = {
          name: "",
          price: "",
          description: "",
          category: "",
          image: null,
        }),
        (this.categories = [
          "Living Room",
          "Bedroom",
          "Office",
          "Outdoor",
          "Dining",
        ]);
    }
    ngOnInit() {
      this.route.params.subscribe((t) => {
        (this.productId = +t.id), this.loadProductDetails();
      });
    }
    loadProductDetails() {
      this.productId &&
        this.productsService.getProductDetails(this.productId).subscribe({
          next: (t) => {
            this.product = t;
          },
          error: (t) => {
            console.error("Error fetching product details:", t);
          },
        });
    }
    onFileChange(t) {
      let r = t.target.files[0];
      r && (this.product.image = r);
    }
    updateProduct() {
      if (this.productId) {
        let t = new FormData();
        t.append("name", this.product.name),
          t.append("price", this.product.price),
          t.append("description", this.product.description),
          t.append("category", this.product.category),
          this.product.image &&
            this.product.image instanceof Blob &&
            t.append("image", this.product.image, this.product.image.name),
          this.productsService.updateProduct(this.productId, t).subscribe({
            next: (r) => {
              console.log("Product updated successfully:", r),
                this.router.navigate(["/products-for-admin"]);
            },
            error: (r) => {
              console.error("Error updating product:", r);
            },
          });
      }
    }
    static {
      this.ɵfac = function (r) {
        return new (r || e)(C(Et), C(Ge), C(ce));
      };
    }
    static {
      this.ɵcmp = J({
        type: e,
        selectors: [["app-update-product"]],
        standalone: !1,
        decls: 33,
        vars: 5,
        consts: [
          [1, "container-fluid", "background"],
          [
            1,
            "d-flex",
            "justify-content-center",
            "align-items-center",
            2,
            "min-height",
            "100vh",
          ],
          [1, "card", "border-0", "bg-form", "w-md-50", "my-5"],
          [1, "card-body"],
          [1, "text-center", "mb-4"],
          ["enctype", "multipart/form-data", 3, "ngSubmit"],
          [1, "mb-3"],
          ["for", "image", 1, "form-label", "text-dark"],
          ["type", "file", "id", "image", 1, "form-control", 3, "change"],
          ["for", "name", 1, "form-label", "text-dark"],
          [
            "id",
            "name",
            "type",
            "text",
            "name",
            "name",
            "placeholder",
            "Enter product name",
            "required",
            "",
            1,
            "form-control",
            3,
            "ngModelChange",
            "ngModel",
          ],
          ["for", "price", 1, "form-label", "text-dark"],
          [
            "id",
            "price",
            "type",
            "number",
            "name",
            "price",
            "placeholder",
            "Enter product price",
            "required",
            "",
            1,
            "form-control",
            3,
            "ngModelChange",
            "ngModel",
          ],
          ["for", "description", 1, "form-label", "text-dark"],
          [
            "id",
            "description",
            "name",
            "description",
            "placeholder",
            "Enter product description",
            "rows",
            "4",
            "required",
            "",
            1,
            "form-control",
            3,
            "ngModelChange",
            "ngModel",
          ],
          ["for", "category", 1, "form-label", "text-dark"],
          [
            "id",
            "category",
            "name",
            "category",
            "required",
            "",
            1,
            "form-select",
            3,
            "ngModelChange",
            "ngModel",
          ],
          ["value", "", "disabled", ""],
          [3, "value", 4, "ngFor", "ngForOf"],
          [1, "d-flex", "justify-content-center"],
          ["type", "submit", 1, "btn", "btn-primary"],
          [3, "value"],
        ],
        template: function (r, i) {
          r & 1 &&
            (p(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h3", 4),
            _(5, "Update Product"),
            g(),
            p(6, "form", 5),
            j("ngSubmit", function () {
              return i.updateProduct();
            }),
            p(7, "div", 6)(8, "label", 7),
            _(9, "Image"),
            g(),
            p(10, "input", 8),
            j("change", function (s) {
              return i.onFileChange(s);
            }),
            g()(),
            p(11, "div", 6)(12, "label", 9),
            _(13, "Name"),
            g(),
            p(14, "input", 10),
            he("ngModelChange", function (s) {
              return ge(i.product.name, s) || (i.product.name = s), s;
            }),
            g()(),
            p(15, "div", 6)(16, "label", 11),
            _(17, "Price"),
            g(),
            p(18, "input", 12),
            he("ngModelChange", function (s) {
              return ge(i.product.price, s) || (i.product.price = s), s;
            }),
            g()(),
            p(19, "div", 6)(20, "label", 13),
            _(21, "Description"),
            g(),
            p(22, "textarea", 14),
            he("ngModelChange", function (s) {
              return (
                ge(i.product.description, s) || (i.product.description = s), s
              );
            }),
            g()(),
            p(23, "div", 6)(24, "label", 15),
            _(25, "Category"),
            g(),
            p(26, "select", 16),
            he("ngModelChange", function (s) {
              return ge(i.product.category, s) || (i.product.category = s), s;
            }),
            p(27, "option", 17),
            _(28, "Select a category"),
            g(),
            He(29, sA, 2, 2, "option", 18),
            g()(),
            p(30, "div", 19)(31, "button", 20),
            _(32, " Save Changes "),
            g()()()()()()()),
            r & 2 &&
              (A(14),
              fe("ngModel", i.product.name),
              A(4),
              fe("ngModel", i.product.price),
              A(4),
              fe("ngModel", i.product.description),
              A(4),
              fe("ngModel", i.product.category),
              A(3),
              re("ngForOf", i.categories));
        },
        dependencies: [An, Bt, bl, Il, ze, To, pi, ft, jt, Ct, tt, wt],
        styles: [
          '.background[_ngcontent-%COMP%]{background-image:url("./media/bgCreate-KWPMF7WI.jpg");background-size:cover;background-position:center}.bg-form[_ngcontent-%COMP%]{background-color:#fff0}',
        ],
      });
    }
  }
  return e;
})();
function aA(e, n) {
  if (e & 1) {
    let t = Aa();
    p(0, "tr", 13)(1, "td"),
      V(2, "img", 14),
      g(),
      p(3, "td"),
      _(4),
      g(),
      p(5, "td"),
      _(6),
      xa(7, "currency"),
      g(),
      p(8, "td"),
      _(9),
      g(),
      p(10, "td")(11, "button", 15),
      j("click", function () {
        let i = da(t).$implicit,
          o = Wr();
        return fa(o.deleteProduct(i.id));
      }),
      _(12, "Delete"),
      g(),
      p(13, "button", 16)(14, "a", 17),
      _(15, "Update"),
      g()()()();
  }
  if (e & 2) {
    let t = n.$implicit;
    A(2),
      re("src", t.image, tr),
      A(2),
      Je(t.name),
      A(2),
      Je(Ra(7, 6, t.price)),
      A(3),
      Je(t.category),
      A(5),
      Zr("routerLink", "/update-product/", t.id, "");
  }
}
var vD = (() => {
  class e {
    constructor(t) {
      (this.productsService = t),
        (this.products = []),
        (this.nextPage = null),
        (this.previousPage = null);
    }
    ngOnInit() {
      this.fetchProducts();
    }
    handleSearchResult(t) {
      t.length > 0 ? (this.products = t) : this.fetchProducts();
    }
    fetchProducts(t = null) {
      console.log("Fetching products...", t);
      let r = t || "https://furniture-production-4fc8.up.railway.app/products/";
      r.startsWith("http://") && (r = r.replace("http://", "https://")),
        this.productsService.getProducts(r).subscribe({
          next: (i) => {
            console.log("Products:", i),
              (this.products = i.results),
              (this.nextPage = i.next),
              (this.previousPage = i.previous);
          },
          error: (i) => {
            console.error("Error fetching products:", i);
          },
        });
    }
    nextPageHandler() {
      this.nextPage && this.fetchProducts(this.nextPage);
    }
    previousPageHandler() {
      this.previousPage && this.fetchProducts(this.previousPage);
    }
    deleteProduct(t) {
      this.productsService.deleteProduct(t).subscribe({
        next: (r) => {
          console.log("Product deleted successfully:", r), this.fetchProducts();
        },
        error: (r) => {
          console.error("Error deleting product:", r);
        },
      });
    }
    static {
      this.ɵfac = function (r) {
        return new (r || e)(C(Ge));
      };
    }
    static {
      this.ɵcmp = J({
        type: e,
        selectors: [["app-products-for-admin"]],
        standalone: !1,
        decls: 28,
        vars: 3,
        consts: [
          [1, "container-fluid", "background"],
          [1, "d-flex", "justify-content-evenly", "align-items-center", "py-4"],
          [3, "searchResults"],
          [1, "btn", "btn-success"],
          [
            "routerLink",
            "/create-product",
            1,
            "text-white",
            "text-decoration-none",
          ],
          [1, "row", "justify-content-center"],
          [1, "col-12", "col-md-10", "col-lg-8", "table-responsive"],
          [1, "table", "table-bordered"],
          [1, "thead-dark"],
          [1, "text-center"],
          ["class", "align-middle", 4, "ngFor", "ngForOf"],
          [1, "d-flex", "justify-content-between", "my-5"],
          [1, "btn", "btn-primary", 3, "click", "disabled"],
          [1, "align-middle"],
          [
            "alt",
            "Product Image",
            "width",
            "100",
            "height",
            "100",
            1,
            "rounded",
            3,
            "src",
          ],
          [1, "btn", "btn-danger", "me-2", 3, "click"],
          [1, "btn", "btn-info"],
          [1, "text-white", "text-decoration-none", 3, "routerLink"],
        ],
        template: function (r, i) {
          r & 1 &&
            (p(0, "div", 0)(1, "div", 1)(2, "app-search-by-name", 2),
            j("searchResults", function (s) {
              return i.handleSearchResult(s);
            }),
            g(),
            p(3, "button", 3)(4, "a", 4),
            _(5, "Create"),
            g()()(),
            p(6, "div", 5)(7, "div", 6)(8, "table", 7)(9, "thead", 8)(
              10,
              "tr",
              9
            )(11, "th"),
            _(12, "Image"),
            g(),
            p(13, "th"),
            _(14, "Name"),
            g(),
            p(15, "th"),
            _(16, "Price"),
            g(),
            p(17, "th"),
            _(18, "Category"),
            g(),
            p(19, "th"),
            _(20, "Actions"),
            g()()(),
            p(21, "tbody", 9),
            He(22, aA, 16, 8, "tr", 10),
            g()(),
            p(23, "div", 11)(24, "button", 12),
            j("click", function () {
              return i.previousPageHandler();
            }),
            _(25, "Previous"),
            g(),
            p(26, "button", 12),
            j("click", function () {
              return i.nextPageHandler();
            }),
            _(27, "Next"),
            g()()()()()),
            r & 2 &&
              (A(22),
              re("ngForOf", i.products),
              A(2),
              re("disabled", !i.previousPage),
              A(2),
              re("disabled", !i.nextPage));
        },
        dependencies: [An, Vt, Sl, Va],
        styles: [
          '.background[_ngcontent-%COMP%]{background-image:url("./media/bgCreate-KWPMF7WI.jpg");background-size:cover;background-position:center}.bg-form[_ngcontent-%COMP%]{background-color:#fff0}',
        ],
      });
    }
  }
  return e;
})();
var DD = (() => {
  class e {
    constructor(t) {
      (this.authService = t),
        (this.user = JSON.parse(localStorage.getItem("user") || "{}"));
    }
    updateProfile() {
      let t = { username: this.user.username, email: this.user.email };
      this.authService.updateProfile(t).subscribe({
        next: (r) => {
          console.log("Profile updated successfully:", r),
            localStorage.setItem("user", JSON.stringify(r.user));
        },
        error: (r) => {
          console.error("Error updating profile:", r);
        },
      });
    }
    static {
      this.ɵfac = function (r) {
        return new (r || e)(C(dt));
      };
    }
    static {
      this.ɵcmp = J({
        type: e,
        selectors: [["app-update-profile"]],
        standalone: !1,
        decls: 18,
        vars: 2,
        consts: [
          [1, "background", "container-fluid"],
          [1, "row", "justify-content-center"],
          [1, "col-12", "col-md-8", "col-lg-6", "my-5"],
          [1, "card", "border-0", "p-4", "my-5", "bg-transparent"],
          [1, "text-center", "mb-4"],
          [1, "p-5", "bg-form", "rounded", 3, "ngSubmit"],
          [1, "mb-3"],
          ["for", "name", 1, "form-label"],
          [
            "id",
            "name",
            "type",
            "text",
            "name",
            "name",
            "placeholder",
            "Enter your name",
            "required",
            "",
            1,
            "form-control",
            3,
            "ngModelChange",
            "ngModel",
          ],
          ["for", "email", 1, "form-label"],
          [
            "id",
            "email",
            "type",
            "email",
            "name",
            "email",
            "placeholder",
            "Enter your email",
            "required",
            "",
            1,
            "form-control",
            3,
            "ngModelChange",
            "ngModel",
          ],
          [1, "d-flex", "justify-content-center", "mt-3"],
          ["type", "submit", 1, "btn", "btn-primary"],
        ],
        template: function (r, i) {
          r & 1 &&
            (p(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h3", 4),
            _(5, "Update Profile"),
            g(),
            p(6, "form", 5),
            j("ngSubmit", function () {
              return i.updateProfile();
            }),
            p(7, "div", 6)(8, "label", 7),
            _(9, "Name"),
            g(),
            p(10, "input", 8),
            he("ngModelChange", function (s) {
              return ge(i.user.username, s) || (i.user.username = s), s;
            }),
            g()(),
            p(11, "div", 6)(12, "label", 9),
            _(13, "Email"),
            g(),
            p(14, "input", 10),
            he("ngModelChange", function (s) {
              return ge(i.user.email, s) || (i.user.email = s), s;
            }),
            g()(),
            p(15, "div", 11)(16, "button", 12),
            _(17, " Update "),
            g()()()()()()()),
            r & 2 &&
              (A(10),
              fe("ngModel", i.user.username),
              A(4),
              fe("ngModel", i.user.email));
        },
        dependencies: [Bt, ze, ft, jt, Ct, tt, wt],
        styles: [
          '.background[_ngcontent-%COMP%]{background-image:url("./media/bgCreate-KWPMF7WI.jpg");background-size:cover;background-position:center}.bg-form[_ngcontent-%COMP%]{background-color:#fff0}',
        ],
      });
    }
  }
  return e;
})();
function lA(e, n) {
  if ((e & 1 && (p(0, "option", 21), _(1), g()), e & 2)) {
    let t = n.$implicit;
    re("value", t), A(), Kr(" ", t, " ");
  }
}
var _D = (() => {
  class e {
    constructor(t, r) {
      (this.productsService = t),
        (this.router = r),
        (this.product = {
          name: "",
          price: "",
          image: "",
          description: "",
          category: "",
        }),
        (this.categories = [
          "Living Room",
          "Bedroom",
          "Office",
          "Outdoor",
          "Dining",
        ]);
    }
    onImageChange(t) {
      let r = t.target.files[0];
      this.product.image = r;
    }
    createProduct() {
      let t = new FormData();
      t.append("name", this.product.name),
        t.append("price", this.product.price),
        t.append("description", this.product.description),
        t.append("category", this.product.category),
        this.product.image && t.append("image", this.product.image),
        console.log(t),
        this.productsService.createProduct(t).subscribe({
          next: (r) => {
            console.log("Product created successfully:", r),
              this.router.navigate(["/products-for-admin"]);
          },
          error: (r) => {
            console.error("Error creating product:", r);
          },
        });
    }
    static {
      this.ɵfac = function (r) {
        return new (r || e)(C(Ge), C(ce));
      };
    }
    static {
      this.ɵcmp = J({
        type: e,
        selectors: [["app-create-product"]],
        standalone: !1,
        decls: 33,
        vars: 5,
        consts: [
          [1, "container-fluid", "background"],
          [
            1,
            "d-flex",
            "justify-content-center",
            "align-items-center",
            2,
            "min-height",
            "100vh",
          ],
          [1, "card", "border-0", "bg-form", "w-md-50", "my-5"],
          [1, "card-body"],
          [1, "text-center", "mb-4"],
          [3, "ngSubmit"],
          [1, "mb-3"],
          ["for", "image", 1, "form-label", "text-dark"],
          [
            "id",
            "image",
            "type",
            "file",
            "name",
            "image",
            "required",
            "",
            1,
            "form-control",
            3,
            "change",
          ],
          ["for", "name", 1, "form-label", "text-dark"],
          [
            "id",
            "name",
            "type",
            "text",
            "name",
            "name",
            "placeholder",
            "Enter product name",
            "required",
            "",
            1,
            "form-control",
            3,
            "ngModelChange",
            "ngModel",
          ],
          ["for", "price", 1, "form-label", "text-dark"],
          [
            "id",
            "price",
            "type",
            "number",
            "name",
            "price",
            "placeholder",
            "Enter product price",
            "required",
            "",
            1,
            "form-control",
            3,
            "ngModelChange",
            "ngModel",
          ],
          ["for", "description", 1, "form-label", "text-dark"],
          [
            "id",
            "description",
            "name",
            "description",
            "placeholder",
            "Enter product description",
            "rows",
            "4",
            "required",
            "",
            1,
            "form-control",
            3,
            "ngModelChange",
            "ngModel",
          ],
          ["for", "category", 1, "form-label", "text-dark"],
          [
            "id",
            "category",
            "name",
            "category",
            "required",
            "",
            1,
            "form-select",
            3,
            "ngModelChange",
            "ngModel",
          ],
          ["value", "", "disabled", ""],
          [3, "value", 4, "ngFor", "ngForOf"],
          [1, "d-flex", "justify-content-center"],
          ["type", "submit", 1, "btn", "btn-primary"],
          [3, "value"],
        ],
        template: function (r, i) {
          r & 1 &&
            (p(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h3", 4),
            _(5, "Create Product"),
            g(),
            p(6, "form", 5),
            j("ngSubmit", function () {
              return i.createProduct();
            }),
            p(7, "div", 6)(8, "label", 7),
            _(9, "Image"),
            g(),
            p(10, "input", 8),
            j("change", function (s) {
              return i.onImageChange(s);
            }),
            g()(),
            p(11, "div", 6)(12, "label", 9),
            _(13, "Name"),
            g(),
            p(14, "input", 10),
            he("ngModelChange", function (s) {
              return ge(i.product.name, s) || (i.product.name = s), s;
            }),
            g()(),
            p(15, "div", 6)(16, "label", 11),
            _(17, "Price"),
            g(),
            p(18, "input", 12),
            he("ngModelChange", function (s) {
              return ge(i.product.price, s) || (i.product.price = s), s;
            }),
            g()(),
            p(19, "div", 6)(20, "label", 13),
            _(21, "Description"),
            g(),
            p(22, "textarea", 14),
            he("ngModelChange", function (s) {
              return (
                ge(i.product.description, s) || (i.product.description = s), s
              );
            }),
            g()(),
            p(23, "div", 6)(24, "label", 15),
            _(25, "Category"),
            g(),
            p(26, "select", 16),
            he("ngModelChange", function (s) {
              return ge(i.product.category, s) || (i.product.category = s), s;
            }),
            p(27, "option", 17),
            _(28, "Select a category"),
            g(),
            He(29, lA, 2, 2, "option", 18),
            g()(),
            p(30, "div", 19)(31, "button", 20),
            _(32, " Create "),
            g()()()()()()()),
            r & 2 &&
              (A(14),
              fe("ngModel", i.product.name),
              A(4),
              fe("ngModel", i.product.price),
              A(4),
              fe("ngModel", i.product.description),
              A(4),
              fe("ngModel", i.product.category),
              A(3),
              re("ngForOf", i.categories));
        },
        dependencies: [An, Bt, bl, Il, ze, To, pi, ft, jt, Ct, tt, wt],
        styles: [
          '.background[_ngcontent-%COMP%]{background-image:url("./media/bgCreate-KWPMF7WI.jpg");background-size:cover;background-position:center}.bg-form[_ngcontent-%COMP%]{background-color:#fff0}',
        ],
      });
    }
  }
  return e;
})();
var mi = (e, n) => {
  let t = v(dt),
    r = v(ce);
  return t.isAuthenticated() ? !0 : (r.navigate(["/login"]), !1);
};
var Ml = (e, n) => {
  let t = v(dt),
    r = v(ce);
  return t.isAdmin() ? !0 : (r.navigate(["/"]), !1);
};
var cA = [
    { path: "login", component: dD },
    { path: "register", component: fD },
    { path: "", component: Bv },
    { path: "products", component: gD },
    { path: "product/:id", component: mD, canActivate: [mi] },
    { path: "create-product", component: _D, canActivate: [mi, Ml] },
    { path: "update-product/:id", component: yD, canActivate: [mi, Ml] },
    { path: "products-for-admin", component: vD, canActivate: [mi, Ml] },
    { path: "update-profile", component: DD, canActivate: [mi] },
  ],
  ED = (() => {
    class e {
      static {
        this.ɵfac = function (r) {
          return new (r || e)();
        };
      }
      static {
        this.ɵmod = Se({ type: e });
      }
      static {
        this.ɵinj = Ie({ imports: [wf.forRoot(cA), wf] });
      }
    }
    return e;
  })();
var wD = (() => {
  class e {
    static {
      this.ɵfac = function (r) {
        return new (r || e)();
      };
    }
    static {
      this.ɵcmp = J({
        type: e,
        selectors: [["app-loading"]],
        decls: 3,
        vars: 0,
        consts: [
          [1, "w-100"],
          [1, "d-flex", "justify-content-center", "align-items-center"],
          [
            "src",
            "../../../assets/output-onlinegiftools (6).gif",
            "alt",
            "Loading...",
            1,
            "w-50",
          ],
        ],
        template: function (r, i) {
          r & 1 && (p(0, "div", 0)(1, "div", 1), V(2, "img", 2), g()());
        },
        encapsulation: 2,
      });
    }
  }
  return e;
})();
function dA(e, n) {
  e & 1 && (p(0, "li", 9)(1, "a", 10), _(2, "Products"), g()());
}
function fA(e, n) {
  e & 1 && (p(0, "li", 9)(1, "a", 11), _(2, "Products"), g()());
}
function hA(e, n) {
  e & 1 && (p(0, "li", 9)(1, "a", 12), _(2, "Profile"), g()());
}
function pA(e, n) {
  if (e & 1) {
    let t = Aa();
    p(0, "li", 9)(1, "div", 13),
      j("click", function () {
        da(t);
        let i = Wr();
        return fa(i.logout());
      }),
      _(2, "Logout"),
      g()();
  }
}
function gA(e, n) {
  e & 1 && (p(0, "li", 9)(1, "a", 14), _(2, "Login"), g()());
}
function mA(e, n) {
  e & 1 && (p(0, "li", 9)(1, "a", 15), _(2, "Register"), g()());
}
var CD = (() => {
  class e {
    constructor(t, r) {
      (this.authService = t),
        (this.router = r),
        (this.isAdmin = this.authService.isAdmin()),
        (this.isAuthenticated = this.authService.isAuthenticated());
    }
    ngOnInit() {
      (this.isAuthenticated = !!localStorage.getItem("token")),
        this.router.events.subscribe(() => {
          this.isAuthenticated = !!localStorage.getItem("token");
        });
    }
    logout() {
      this.authService.logout(),
        (this.isAuthenticated = !1),
        this.router.navigate(["/login"]),
        localStorage.clear();
    }
    static {
      this.ɵfac = function (r) {
        return new (r || e)(C(dt), C(ce));
      };
    }
    static {
      this.ɵcmp = J({
        type: e,
        selectors: [["app-header"]],
        standalone: !1,
        decls: 14,
        vars: 6,
        consts: [
          [
            "data-bs-theme",
            "dark",
            1,
            "navbar",
            "navbar-expand-lg",
            "bg-body-tertiary",
          ],
          [1, "container-fluid"],
          ["href", "#", 1, "navbar-brand", "text-white"],
          [
            "type",
            "button",
            "data-bs-toggle",
            "collapse",
            "data-bs-target",
            "#navbarSupportedContent",
            "aria-controls",
            "navbarSupportedContent",
            "aria-expanded",
            "false",
            "aria-label",
            "Toggle navigation",
            1,
            "navbar-toggler",
          ],
          [1, "navbar-toggler-icon"],
          ["id", "navbarSupportedContent", 1, "collapse", "navbar-collapse"],
          [1, "navbar-nav", "ms-auto", "mb-2", "mb-lg-0"],
          ["class", "nav-item", 4, "ngIf"],
          ["class", "nav-item ", 4, "ngIf"],
          [1, "nav-item"],
          ["routerLink", "products", 1, "nav-link", "text-white"],
          ["routerLink", "products-for-admin", 1, "nav-link", "text-white"],
          ["routerLink", "update-profile", 1, "nav-link", "text-white"],
          [1, "nav-link", "text-white", 3, "click"],
          ["routerLink", "login", 1, "nav-link", "text-white"],
          ["routerLink", "register", 1, "nav-link", "text-white"],
        ],
        template: function (r, i) {
          r & 1 &&
            (p(0, "nav", 0)(1, "div", 1)(2, "a", 2),
            _(3, "Modern Furniture"),
            g(),
            p(4, "button", 3),
            V(5, "span", 4),
            g(),
            p(6, "div", 5)(7, "ul", 6),
            He(8, dA, 3, 0, "li", 7)(9, fA, 3, 0, "li", 7)(
              10,
              hA,
              3,
              0,
              "li",
              7
            )(11, pA, 3, 0, "li", 8)(12, gA, 3, 0, "li", 7)(
              13,
              mA,
              3,
              0,
              "li",
              7
            ),
            g()()()()),
            r & 2 &&
              (A(8),
              re(
                "ngIf",
                (!i.isAdmin && i.isAuthenticated) || !i.isAuthenticated
              ),
              A(),
              re("ngIf", i.isAdmin && i.isAuthenticated),
              A(),
              re("ngIf", i.isAuthenticated),
              A(),
              re("ngIf", i.isAuthenticated),
              A(),
              re("ngIf", !i.isAuthenticated),
              A(),
              re("ngIf", !i.isAuthenticated));
        },
        dependencies: [Xr, Vt],
        encapsulation: 2,
      });
    }
  }
  return e;
})();
var bD = (() => {
  class e {
    static {
      this.ɵfac = function (r) {
        return new (r || e)();
      };
    }
    static {
      this.ɵcmp = J({
        type: e,
        selectors: [["app-footer"]],
        standalone: !1,
        decls: 17,
        vars: 0,
        consts: [
          [1, "text-center", 2, "background-color", "#000000"],
          [1, "container", "p-4", "pb-0"],
          [1, ""],
          [
            "data-mdb-ripple-init",
            "",
            "href",
            "#!",
            "role",
            "button",
            1,
            "btn",
            "text-white",
            "btn-floatin",
            "me-2",
            2,
            "background-color",
            "#3b5998",
          ],
          [1, "fa-brands", "fa-facebook"],
          [
            "data-mdb-ripple-init",
            "",
            "href",
            "#!",
            "role",
            "button",
            1,
            "btn",
            "text-white",
            "btn-floating",
            "me-2",
            2,
            "background-color",
            "#55acee",
          ],
          [1, "fa-brands", "fa-twitter"],
          [
            "data-mdb-ripple-init",
            "",
            "href",
            "#!",
            "role",
            "button",
            1,
            "btn",
            "text-white",
            "btn-floating",
            "me-2",
            2,
            "background-color",
            "#dd4b39",
          ],
          [1, "fa-brands", "fa-google"],
          [
            "data-mdb-ripple-init",
            "",
            "href",
            "#!",
            "role",
            "button",
            1,
            "btn",
            "text-white",
            "btn-floating",
            "me-2",
            2,
            "background-color",
            "#ac2bac",
          ],
          [1, "fa-brands", "fa-instagram"],
          [
            "data-mdb-ripple-init",
            "",
            "href",
            "#!",
            "role",
            "button",
            1,
            "btn",
            "text-white",
            "btn-floating",
            "me-2",
            2,
            "background-color",
            "#0082ca",
          ],
          [1, "fa-brands", "fa-linkedin"],
          [
            "data-mdb-ripple-init",
            "",
            "href",
            "#!",
            "role",
            "button",
            1,
            "btn",
            "text-white",
            "btn-floating",
            2,
            "background-color",
            "#333333",
          ],
          [1, "fa-brands", "fa-github"],
          [1, "text-center", "p-3", "text-white"],
        ],
        template: function (r, i) {
          r & 1 &&
            (p(0, "footer", 0)(1, "div", 1)(2, "section", 2)(3, "a", 3),
            V(4, "i", 4),
            g(),
            p(5, "a", 5),
            V(6, "i", 6),
            g(),
            p(7, "a", 7),
            V(8, "i", 8),
            g(),
            p(9, "a", 9),
            V(10, "i", 10),
            g(),
            p(11, "a", 11),
            V(12, "i", 12),
            g(),
            p(13, "a", 13),
            V(14, "i", 14),
            g()()(),
            p(15, "div", 15),
            _(16, " \xA9 2020 Copyright "),
            g()());
        },
        encapsulation: 2,
      });
    }
  }
  return e;
})();
function DA(e, n) {
  e & 1 && (p(0, "div", 2), V(1, "app-loading"), g());
}
function _A(e, n) {
  e & 1 &&
    (p(0, "div", 3),
    V(1, "app-header")(2, "router-outlet")(3, "app-footer"),
    g());
}
var ID = (() => {
  class e {
    constructor(t) {
      (this.router = t), (this.title = "Furniture"), (this.isloading = !0);
    }
    ngOnInit() {
      this.router.events.subscribe((t) => {
        t instanceof Pn
          ? (this.isloading = !0)
          : t instanceof ut &&
            setTimeout(() => {
              this.isloading = !1;
            }, 1e3);
      });
    }
    static {
      this.ɵfac = function (r) {
        return new (r || e)(C(ce));
      };
    }
    static {
      this.ɵcmp = J({
        type: e,
        selectors: [["app-root"]],
        standalone: !1,
        decls: 2,
        vars: 2,
        consts: [
          ["class", "bg-loading", 4, "ngIf"],
          ["class", "main-content", 4, "ngIf"],
          [1, "bg-loading"],
          [1, "main-content"],
        ],
        template: function (r, i) {
          r & 1 && He(0, DA, 2, 0, "div", 0)(1, _A, 4, 0, "div", 1),
            r & 2 && (re("ngIf", i.isloading), A(), re("ngIf", !i.isloading));
        },
        dependencies: [Xr, mf, wD, CD, bD],
        styles: [
          ".bg-loading[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100%;height:100%;display:flex;justify-content:center;align-items:center;background-color:#000;animation:_ngcontent-%COMP%_fadeOut 1s ease-in-out forwards;z-index:9999}@keyframes _ngcontent-%COMP%_fadeOut{0%{opacity:1}90%{background-color:#000}to{opacity:0;visibility:hidden}}.main-content[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_fadeIn 1s ease-in}@keyframes _ngcontent-%COMP%_fadeIn{0%{opacity:0}to{opacity:1}}",
        ],
      });
    }
  }
  return e;
})();
var H = (function (e) {
    return (
      (e[(e.State = 0)] = "State"),
      (e[(e.Transition = 1)] = "Transition"),
      (e[(e.Sequence = 2)] = "Sequence"),
      (e[(e.Group = 3)] = "Group"),
      (e[(e.Animate = 4)] = "Animate"),
      (e[(e.Keyframes = 5)] = "Keyframes"),
      (e[(e.Style = 6)] = "Style"),
      (e[(e.Trigger = 7)] = "Trigger"),
      (e[(e.Reference = 8)] = "Reference"),
      (e[(e.AnimateChild = 9)] = "AnimateChild"),
      (e[(e.AnimateRef = 10)] = "AnimateRef"),
      (e[(e.Query = 11)] = "Query"),
      (e[(e.Stagger = 12)] = "Stagger"),
      e
    );
  })(H || {}),
  Ut = "*";
function SD(e, n = null) {
  return { type: H.Sequence, steps: e, options: n };
}
function Af(e) {
  return { type: H.Style, styles: e, offset: null };
}
var kn = class {
    _onDoneFns = [];
    _onStartFns = [];
    _onDestroyFns = [];
    _originalOnDoneFns = [];
    _originalOnStartFns = [];
    _started = !1;
    _destroyed = !1;
    _finished = !1;
    _position = 0;
    parentPlayer = null;
    totalTime;
    constructor(n = 0, t = 0) {
      this.totalTime = n + t;
    }
    _onFinish() {
      this._finished ||
        ((this._finished = !0),
        this._onDoneFns.forEach((n) => n()),
        (this._onDoneFns = []));
    }
    onStart(n) {
      this._originalOnStartFns.push(n), this._onStartFns.push(n);
    }
    onDone(n) {
      this._originalOnDoneFns.push(n), this._onDoneFns.push(n);
    }
    onDestroy(n) {
      this._onDestroyFns.push(n);
    }
    hasStarted() {
      return this._started;
    }
    init() {}
    play() {
      this.hasStarted() || (this._onStart(), this.triggerMicrotask()),
        (this._started = !0);
    }
    triggerMicrotask() {
      queueMicrotask(() => this._onFinish());
    }
    _onStart() {
      this._onStartFns.forEach((n) => n()), (this._onStartFns = []);
    }
    pause() {}
    restart() {}
    finish() {
      this._onFinish();
    }
    destroy() {
      this._destroyed ||
        ((this._destroyed = !0),
        this.hasStarted() || this._onStart(),
        this.finish(),
        this._onDestroyFns.forEach((n) => n()),
        (this._onDestroyFns = []));
    }
    reset() {
      (this._started = !1),
        (this._finished = !1),
        (this._onStartFns = this._originalOnStartFns),
        (this._onDoneFns = this._originalOnDoneFns);
    }
    setPosition(n) {
      this._position = this.totalTime ? n * this.totalTime : 1;
    }
    getPosition() {
      return this.totalTime ? this._position / this.totalTime : 1;
    }
    triggerCallback(n) {
      let t = n == "start" ? this._onStartFns : this._onDoneFns;
      t.forEach((r) => r()), (t.length = 0);
    }
  },
  Ao = class {
    _onDoneFns = [];
    _onStartFns = [];
    _finished = !1;
    _started = !1;
    _destroyed = !1;
    _onDestroyFns = [];
    parentPlayer = null;
    totalTime = 0;
    players;
    constructor(n) {
      this.players = n;
      let t = 0,
        r = 0,
        i = 0,
        o = this.players.length;
      o == 0
        ? queueMicrotask(() => this._onFinish())
        : this.players.forEach((s) => {
            s.onDone(() => {
              ++t == o && this._onFinish();
            }),
              s.onDestroy(() => {
                ++r == o && this._onDestroy();
              }),
              s.onStart(() => {
                ++i == o && this._onStart();
              });
          }),
        (this.totalTime = this.players.reduce(
          (s, a) => Math.max(s, a.totalTime),
          0
        ));
    }
    _onFinish() {
      this._finished ||
        ((this._finished = !0),
        this._onDoneFns.forEach((n) => n()),
        (this._onDoneFns = []));
    }
    init() {
      this.players.forEach((n) => n.init());
    }
    onStart(n) {
      this._onStartFns.push(n);
    }
    _onStart() {
      this.hasStarted() ||
        ((this._started = !0),
        this._onStartFns.forEach((n) => n()),
        (this._onStartFns = []));
    }
    onDone(n) {
      this._onDoneFns.push(n);
    }
    onDestroy(n) {
      this._onDestroyFns.push(n);
    }
    hasStarted() {
      return this._started;
    }
    play() {
      this.parentPlayer || this.init(),
        this._onStart(),
        this.players.forEach((n) => n.play());
    }
    pause() {
      this.players.forEach((n) => n.pause());
    }
    restart() {
      this.players.forEach((n) => n.restart());
    }
    finish() {
      this._onFinish(), this.players.forEach((n) => n.finish());
    }
    destroy() {
      this._onDestroy();
    }
    _onDestroy() {
      this._destroyed ||
        ((this._destroyed = !0),
        this._onFinish(),
        this.players.forEach((n) => n.destroy()),
        this._onDestroyFns.forEach((n) => n()),
        (this._onDestroyFns = []));
    }
    reset() {
      this.players.forEach((n) => n.reset()),
        (this._destroyed = !1),
        (this._finished = !1),
        (this._started = !1);
    }
    setPosition(n) {
      let t = n * this.totalTime;
      this.players.forEach((r) => {
        let i = r.totalTime ? Math.min(1, t / r.totalTime) : 1;
        r.setPosition(i);
      });
    }
    getPosition() {
      let n = this.players.reduce(
        (t, r) => (t === null || r.totalTime > t.totalTime ? r : t),
        null
      );
      return n != null ? n.getPosition() : 0;
    }
    beforeDestroy() {
      this.players.forEach((n) => {
        n.beforeDestroy && n.beforeDestroy();
      });
    }
    triggerCallback(n) {
      let t = n == "start" ? this._onStartFns : this._onDoneFns;
      t.forEach((r) => r()), (t.length = 0);
    }
  },
  Tl = "!";
function MD(e) {
  return new D(3e3, !1);
}
function EA() {
  return new D(3100, !1);
}
function wA() {
  return new D(3101, !1);
}
function CA(e) {
  return new D(3001, !1);
}
function bA(e) {
  return new D(3003, !1);
}
function IA(e) {
  return new D(3004, !1);
}
function SA(e, n) {
  return new D(3005, !1);
}
function MA() {
  return new D(3006, !1);
}
function TA() {
  return new D(3007, !1);
}
function AA(e, n) {
  return new D(3008, !1);
}
function NA(e) {
  return new D(3002, !1);
}
function xA(e, n, t, r, i) {
  return new D(3010, !1);
}
function RA() {
  return new D(3011, !1);
}
function PA() {
  return new D(3012, !1);
}
function OA() {
  return new D(3200, !1);
}
function FA() {
  return new D(3202, !1);
}
function kA() {
  return new D(3013, !1);
}
function LA(e) {
  return new D(3014, !1);
}
function VA(e) {
  return new D(3015, !1);
}
function jA(e) {
  return new D(3016, !1);
}
function BA(e, n) {
  return new D(3404, !1);
}
function UA(e) {
  return new D(3502, !1);
}
function $A(e) {
  return new D(3503, !1);
}
function HA() {
  return new D(3300, !1);
}
function zA(e) {
  return new D(3504, !1);
}
function GA(e) {
  return new D(3301, !1);
}
function qA(e, n) {
  return new D(3302, !1);
}
function WA(e) {
  return new D(3303, !1);
}
function QA(e, n) {
  return new D(3400, !1);
}
function ZA(e) {
  return new D(3401, !1);
}
function KA(e) {
  return new D(3402, !1);
}
function YA(e, n) {
  return new D(3505, !1);
}
function Ln(e) {
  switch (e.length) {
    case 0:
      return new kn();
    case 1:
      return e[0];
    default:
      return new Ao(e);
  }
}
function UD(e, n, t = new Map(), r = new Map()) {
  let i = [],
    o = [],
    s = -1,
    a = null;
  if (
    (n.forEach((l) => {
      let c = l.get("offset"),
        u = c == s,
        d = (u && a) || new Map();
      l.forEach((h, f) => {
        let m = f,
          y = h;
        if (f !== "offset")
          switch (((m = e.normalizePropertyName(m, i)), y)) {
            case Tl:
              y = t.get(f);
              break;
            case Ut:
              y = r.get(f);
              break;
            default:
              y = e.normalizeStyleValue(f, m, y, i);
              break;
          }
        d.set(m, y);
      }),
        u || o.push(d),
        (a = d),
        (s = c);
    }),
    i.length)
  )
    throw UA(i);
  return o;
}
function Yf(e, n, t, r) {
  switch (n) {
    case "start":
      e.onStart(() => r(t && Nf(t, "start", e)));
      break;
    case "done":
      e.onDone(() => r(t && Nf(t, "done", e)));
      break;
    case "destroy":
      e.onDestroy(() => r(t && Nf(t, "destroy", e)));
      break;
  }
}
function Nf(e, n, t) {
  let r = t.totalTime,
    i = !!t.disabled,
    o = Jf(
      e.element,
      e.triggerName,
      e.fromState,
      e.toState,
      n || e.phaseName,
      r ?? e.totalTime,
      i
    ),
    s = e._data;
  return s != null && (o._data = s), o;
}
function Jf(e, n, t, r, i = "", o = 0, s) {
  return {
    element: e,
    triggerName: n,
    fromState: t,
    toState: r,
    phaseName: i,
    totalTime: o,
    disabled: !!s,
  };
}
function rt(e, n, t) {
  let r = e.get(n);
  return r || e.set(n, (r = t)), r;
}
function TD(e) {
  let n = e.indexOf(":"),
    t = e.substring(1, n),
    r = e.slice(n + 1);
  return [t, r];
}
var JA = typeof document > "u" ? null : document.documentElement;
function Xf(e) {
  let n = e.parentNode || e.host || null;
  return n === JA ? null : n;
}
function XA(e) {
  return e.substring(1, 6) == "ebkit";
}
var cr = null,
  AD = !1;
function eN(e) {
  cr ||
    ((cr = tN() || {}), (AD = cr.style ? "WebkitAppearance" in cr.style : !1));
  let n = !0;
  return (
    cr.style &&
      !XA(e) &&
      ((n = e in cr.style),
      !n &&
        AD &&
        (n = "Webkit" + e.charAt(0).toUpperCase() + e.slice(1) in cr.style)),
    n
  );
}
function tN() {
  return typeof document < "u" ? document.body : null;
}
function $D(e, n) {
  for (; n; ) {
    if (n === e) return !0;
    n = Xf(n);
  }
  return !1;
}
function HD(e, n, t) {
  if (t) return Array.from(e.querySelectorAll(n));
  let r = e.querySelector(n);
  return r ? [r] : [];
}
var eh = (() => {
    class e {
      validateStyleProperty(t) {
        return eN(t);
      }
      containsElement(t, r) {
        return $D(t, r);
      }
      getParentElement(t) {
        return Xf(t);
      }
      query(t, r, i) {
        return HD(t, r, i);
      }
      computeStyle(t, r, i) {
        return i || "";
      }
      animate(t, r, i, o, s, a = [], l) {
        return new kn(i, o);
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = b({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  fr = class {
    static NOOP = new eh();
  },
  hr = class {};
var nN = 1e3,
  zD = "{{",
  rN = "}}",
  GD = "ng-enter",
  kf = "ng-leave",
  Al = "ng-trigger",
  Ol = ".ng-trigger",
  ND = "ng-animating",
  Lf = ".ng-animating";
function dn(e) {
  if (typeof e == "number") return e;
  let n = e.match(/^(-?[\.\d]+)(m?s)/);
  return !n || n.length < 2 ? 0 : Vf(parseFloat(n[1]), n[2]);
}
function Vf(e, n) {
  switch (n) {
    case "s":
      return e * nN;
    default:
      return e;
  }
}
function Fl(e, n, t) {
  return e.hasOwnProperty("duration") ? e : iN(e, n, t);
}
function iN(e, n, t) {
  let r =
      /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i,
    i,
    o = 0,
    s = "";
  if (typeof e == "string") {
    let a = e.match(r);
    if (a === null) return n.push(MD(e)), { duration: 0, delay: 0, easing: "" };
    i = Vf(parseFloat(a[1]), a[2]);
    let l = a[3];
    l != null && (o = Vf(parseFloat(l), a[4]));
    let c = a[5];
    c && (s = c);
  } else i = e;
  if (!t) {
    let a = !1,
      l = n.length;
    i < 0 && (n.push(EA()), (a = !0)),
      o < 0 && (n.push(wA()), (a = !0)),
      a && n.splice(l, 0, MD(e));
  }
  return { duration: i, delay: o, easing: s };
}
function oN(e) {
  return e.length
    ? e[0] instanceof Map
      ? e
      : e.map((n) => new Map(Object.entries(n)))
    : [];
}
function $t(e, n, t) {
  n.forEach((r, i) => {
    let o = th(i);
    t && !t.has(i) && t.set(i, e.style[o]), (e.style[o] = r);
  });
}
function dr(e, n) {
  n.forEach((t, r) => {
    let i = th(r);
    e.style[i] = "";
  });
}
function No(e) {
  return Array.isArray(e) ? (e.length == 1 ? e[0] : SD(e)) : e;
}
function sN(e, n, t) {
  let r = n.params || {},
    i = qD(e);
  i.length &&
    i.forEach((o) => {
      r.hasOwnProperty(o) || t.push(CA(o));
    });
}
var jf = new RegExp(`${zD}\\s*(.+?)\\s*${rN}`, "g");
function qD(e) {
  let n = [];
  if (typeof e == "string") {
    let t;
    for (; (t = jf.exec(e)); ) n.push(t[1]);
    jf.lastIndex = 0;
  }
  return n;
}
function Ro(e, n, t) {
  let r = `${e}`,
    i = r.replace(jf, (o, s) => {
      let a = n[s];
      return a == null && (t.push(bA(s)), (a = "")), a.toString();
    });
  return i == r ? e : i;
}
var aN = /-+([a-z0-9])/g;
function th(e) {
  return e.replace(aN, (...n) => n[1].toUpperCase());
}
function lN(e, n) {
  return e === 0 || n === 0;
}
function cN(e, n, t) {
  if (t.size && n.length) {
    let r = n[0],
      i = [];
    if (
      (t.forEach((o, s) => {
        r.has(s) || i.push(s), r.set(s, o);
      }),
      i.length)
    )
      for (let o = 1; o < n.length; o++) {
        let s = n[o];
        i.forEach((a) => s.set(a, nh(e, a)));
      }
  }
  return n;
}
function nt(e, n, t) {
  switch (n.type) {
    case H.Trigger:
      return e.visitTrigger(n, t);
    case H.State:
      return e.visitState(n, t);
    case H.Transition:
      return e.visitTransition(n, t);
    case H.Sequence:
      return e.visitSequence(n, t);
    case H.Group:
      return e.visitGroup(n, t);
    case H.Animate:
      return e.visitAnimate(n, t);
    case H.Keyframes:
      return e.visitKeyframes(n, t);
    case H.Style:
      return e.visitStyle(n, t);
    case H.Reference:
      return e.visitReference(n, t);
    case H.AnimateChild:
      return e.visitAnimateChild(n, t);
    case H.AnimateRef:
      return e.visitAnimateRef(n, t);
    case H.Query:
      return e.visitQuery(n, t);
    case H.Stagger:
      return e.visitStagger(n, t);
    default:
      throw IA(n.type);
  }
}
function nh(e, n) {
  return window.getComputedStyle(e)[n];
}
var uN = new Set([
    "width",
    "height",
    "minWidth",
    "minHeight",
    "maxWidth",
    "maxHeight",
    "left",
    "top",
    "bottom",
    "right",
    "fontSize",
    "outlineWidth",
    "outlineOffset",
    "paddingTop",
    "paddingLeft",
    "paddingBottom",
    "paddingRight",
    "marginTop",
    "marginLeft",
    "marginBottom",
    "marginRight",
    "borderRadius",
    "borderWidth",
    "borderTopWidth",
    "borderLeftWidth",
    "borderRightWidth",
    "borderBottomWidth",
    "textIndent",
    "perspective",
  ]),
  kl = class extends hr {
    normalizePropertyName(n, t) {
      return th(n);
    }
    normalizeStyleValue(n, t, r, i) {
      let o = "",
        s = r.toString().trim();
      if (uN.has(t) && r !== 0 && r !== "0")
        if (typeof r == "number") o = "px";
        else {
          let a = r.match(/^[+-]?[\d\.]+([a-z]*)$/);
          a && a[1].length == 0 && i.push(SA(n, r));
        }
      return s + o;
    }
  };
var Ll = "*";
function dN(e, n) {
  let t = [];
  return (
    typeof e == "string"
      ? e.split(/\s*,\s*/).forEach((r) => fN(r, t, n))
      : t.push(e),
    t
  );
}
function fN(e, n, t) {
  if (e[0] == ":") {
    let l = hN(e, t);
    if (typeof l == "function") {
      n.push(l);
      return;
    }
    e = l;
  }
  let r = e.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
  if (r == null || r.length < 4) return t.push(VA(e)), n;
  let i = r[1],
    o = r[2],
    s = r[3];
  n.push(xD(i, s));
  let a = i == Ll && s == Ll;
  o[0] == "<" && !a && n.push(xD(s, i));
}
function hN(e, n) {
  switch (e) {
    case ":enter":
      return "void => *";
    case ":leave":
      return "* => void";
    case ":increment":
      return (t, r) => parseFloat(r) > parseFloat(t);
    case ":decrement":
      return (t, r) => parseFloat(r) < parseFloat(t);
    default:
      return n.push(jA(e)), "* => *";
  }
}
var Nl = new Set(["true", "1"]),
  xl = new Set(["false", "0"]);
function xD(e, n) {
  let t = Nl.has(e) || xl.has(e),
    r = Nl.has(n) || xl.has(n);
  return (i, o) => {
    let s = e == Ll || e == i,
      a = n == Ll || n == o;
    return (
      !s && t && typeof i == "boolean" && (s = i ? Nl.has(e) : xl.has(e)),
      !a && r && typeof o == "boolean" && (a = o ? Nl.has(n) : xl.has(n)),
      s && a
    );
  };
}
var WD = ":self",
  pN = new RegExp(`s*${WD}s*,?`, "g");
function QD(e, n, t, r) {
  return new Bf(e).build(n, t, r);
}
var RD = "",
  Bf = class {
    _driver;
    constructor(n) {
      this._driver = n;
    }
    build(n, t, r) {
      let i = new Uf(t);
      return this._resetContextStyleTimingState(i), nt(this, No(n), i);
    }
    _resetContextStyleTimingState(n) {
      (n.currentQuerySelector = RD),
        (n.collectedStyles = new Map()),
        n.collectedStyles.set(RD, new Map()),
        (n.currentTime = 0);
    }
    visitTrigger(n, t) {
      let r = (t.queryCount = 0),
        i = (t.depCount = 0),
        o = [],
        s = [];
      return (
        n.name.charAt(0) == "@" && t.errors.push(MA()),
        n.definitions.forEach((a) => {
          if ((this._resetContextStyleTimingState(t), a.type == H.State)) {
            let l = a,
              c = l.name;
            c
              .toString()
              .split(/\s*,\s*/)
              .forEach((u) => {
                (l.name = u), o.push(this.visitState(l, t));
              }),
              (l.name = c);
          } else if (a.type == H.Transition) {
            let l = this.visitTransition(a, t);
            (r += l.queryCount), (i += l.depCount), s.push(l);
          } else t.errors.push(TA());
        }),
        {
          type: H.Trigger,
          name: n.name,
          states: o,
          transitions: s,
          queryCount: r,
          depCount: i,
          options: null,
        }
      );
    }
    visitState(n, t) {
      let r = this.visitStyle(n.styles, t),
        i = (n.options && n.options.params) || null;
      if (r.containsDynamicStyles) {
        let o = new Set(),
          s = i || {};
        r.styles.forEach((a) => {
          a instanceof Map &&
            a.forEach((l) => {
              qD(l).forEach((c) => {
                s.hasOwnProperty(c) || o.add(c);
              });
            });
        }),
          o.size && t.errors.push(AA(n.name, [...o.values()]));
      }
      return {
        type: H.State,
        name: n.name,
        style: r,
        options: i ? { params: i } : null,
      };
    }
    visitTransition(n, t) {
      (t.queryCount = 0), (t.depCount = 0);
      let r = nt(this, No(n.animation), t),
        i = dN(n.expr, t.errors);
      return {
        type: H.Transition,
        matchers: i,
        animation: r,
        queryCount: t.queryCount,
        depCount: t.depCount,
        options: ur(n.options),
      };
    }
    visitSequence(n, t) {
      return {
        type: H.Sequence,
        steps: n.steps.map((r) => nt(this, r, t)),
        options: ur(n.options),
      };
    }
    visitGroup(n, t) {
      let r = t.currentTime,
        i = 0,
        o = n.steps.map((s) => {
          t.currentTime = r;
          let a = nt(this, s, t);
          return (i = Math.max(i, t.currentTime)), a;
        });
      return (
        (t.currentTime = i), { type: H.Group, steps: o, options: ur(n.options) }
      );
    }
    visitAnimate(n, t) {
      let r = vN(n.timings, t.errors);
      t.currentAnimateTimings = r;
      let i,
        o = n.styles ? n.styles : Af({});
      if (o.type == H.Keyframes) i = this.visitKeyframes(o, t);
      else {
        let s = n.styles,
          a = !1;
        if (!s) {
          a = !0;
          let c = {};
          r.easing && (c.easing = r.easing), (s = Af(c));
        }
        t.currentTime += r.duration + r.delay;
        let l = this.visitStyle(s, t);
        (l.isEmptyStep = a), (i = l);
      }
      return (
        (t.currentAnimateTimings = null),
        { type: H.Animate, timings: r, style: i, options: null }
      );
    }
    visitStyle(n, t) {
      let r = this._makeStyleAst(n, t);
      return this._validateStyleAst(r, t), r;
    }
    _makeStyleAst(n, t) {
      let r = [],
        i = Array.isArray(n.styles) ? n.styles : [n.styles];
      for (let a of i)
        typeof a == "string"
          ? a === Ut
            ? r.push(a)
            : t.errors.push(NA(a))
          : r.push(new Map(Object.entries(a)));
      let o = !1,
        s = null;
      return (
        r.forEach((a) => {
          if (
            a instanceof Map &&
            (a.has("easing") && ((s = a.get("easing")), a.delete("easing")), !o)
          ) {
            for (let l of a.values())
              if (l.toString().indexOf(zD) >= 0) {
                o = !0;
                break;
              }
          }
        }),
        {
          type: H.Style,
          styles: r,
          easing: s,
          offset: n.offset,
          containsDynamicStyles: o,
          options: null,
        }
      );
    }
    _validateStyleAst(n, t) {
      let r = t.currentAnimateTimings,
        i = t.currentTime,
        o = t.currentTime;
      r && o > 0 && (o -= r.duration + r.delay),
        n.styles.forEach((s) => {
          typeof s != "string" &&
            s.forEach((a, l) => {
              let c = t.collectedStyles.get(t.currentQuerySelector),
                u = c.get(l),
                d = !0;
              u &&
                (o != i &&
                  o >= u.startTime &&
                  i <= u.endTime &&
                  (t.errors.push(xA(l, u.startTime, u.endTime, o, i)),
                  (d = !1)),
                (o = u.startTime)),
                d && c.set(l, { startTime: o, endTime: i }),
                t.options && sN(a, t.options, t.errors);
            });
        });
    }
    visitKeyframes(n, t) {
      let r = { type: H.Keyframes, styles: [], options: null };
      if (!t.currentAnimateTimings) return t.errors.push(RA()), r;
      let i = 1,
        o = 0,
        s = [],
        a = !1,
        l = !1,
        c = 0,
        u = n.steps.map((S) => {
          let O = this._makeStyleAst(S, t),
            x = O.offset != null ? O.offset : yN(O.styles),
            U = 0;
          return (
            x != null && (o++, (U = O.offset = x)),
            (l = l || U < 0 || U > 1),
            (a = a || U < c),
            (c = U),
            s.push(U),
            O
          );
        });
      l && t.errors.push(PA()), a && t.errors.push(OA());
      let d = n.steps.length,
        h = 0;
      o > 0 && o < d ? t.errors.push(FA()) : o == 0 && (h = i / (d - 1));
      let f = d - 1,
        m = t.currentTime,
        y = t.currentAnimateTimings,
        E = y.duration;
      return (
        u.forEach((S, O) => {
          let x = h > 0 ? (O == f ? 1 : h * O) : s[O],
            U = x * E;
          (t.currentTime = m + y.delay + U),
            (y.duration = U),
            this._validateStyleAst(S, t),
            (S.offset = x),
            r.styles.push(S);
        }),
        r
      );
    }
    visitReference(n, t) {
      return {
        type: H.Reference,
        animation: nt(this, No(n.animation), t),
        options: ur(n.options),
      };
    }
    visitAnimateChild(n, t) {
      return t.depCount++, { type: H.AnimateChild, options: ur(n.options) };
    }
    visitAnimateRef(n, t) {
      return {
        type: H.AnimateRef,
        animation: this.visitReference(n.animation, t),
        options: ur(n.options),
      };
    }
    visitQuery(n, t) {
      let r = t.currentQuerySelector,
        i = n.options || {};
      t.queryCount++, (t.currentQuery = n);
      let [o, s] = gN(n.selector);
      (t.currentQuerySelector = r.length ? r + " " + o : o),
        rt(t.collectedStyles, t.currentQuerySelector, new Map());
      let a = nt(this, No(n.animation), t);
      return (
        (t.currentQuery = null),
        (t.currentQuerySelector = r),
        {
          type: H.Query,
          selector: o,
          limit: i.limit || 0,
          optional: !!i.optional,
          includeSelf: s,
          animation: a,
          originalSelector: n.selector,
          options: ur(n.options),
        }
      );
    }
    visitStagger(n, t) {
      t.currentQuery || t.errors.push(kA());
      let r =
        n.timings === "full"
          ? { duration: 0, delay: 0, easing: "full" }
          : Fl(n.timings, t.errors, !0);
      return {
        type: H.Stagger,
        animation: nt(this, No(n.animation), t),
        timings: r,
        options: null,
      };
    }
  };
function gN(e) {
  let n = !!e.split(/\s*,\s*/).find((t) => t == WD);
  return (
    n && (e = e.replace(pN, "")),
    (e = e
      .replace(/@\*/g, Ol)
      .replace(/@\w+/g, (t) => Ol + "-" + t.slice(1))
      .replace(/:animating/g, Lf)),
    [e, n]
  );
}
function mN(e) {
  return e ? w({}, e) : null;
}
var Uf = class {
  errors;
  queryCount = 0;
  depCount = 0;
  currentTransition = null;
  currentQuery = null;
  currentQuerySelector = null;
  currentAnimateTimings = null;
  currentTime = 0;
  collectedStyles = new Map();
  options = null;
  unsupportedCSSPropertiesFound = new Set();
  constructor(n) {
    this.errors = n;
  }
};
function yN(e) {
  if (typeof e == "string") return null;
  let n = null;
  if (Array.isArray(e))
    e.forEach((t) => {
      if (t instanceof Map && t.has("offset")) {
        let r = t;
        (n = parseFloat(r.get("offset"))), r.delete("offset");
      }
    });
  else if (e instanceof Map && e.has("offset")) {
    let t = e;
    (n = parseFloat(t.get("offset"))), t.delete("offset");
  }
  return n;
}
function vN(e, n) {
  if (e.hasOwnProperty("duration")) return e;
  if (typeof e == "number") {
    let o = Fl(e, n).duration;
    return xf(o, 0, "");
  }
  let t = e;
  if (t.split(/\s+/).some((o) => o.charAt(0) == "{" && o.charAt(1) == "{")) {
    let o = xf(0, 0, "");
    return (o.dynamic = !0), (o.strValue = t), o;
  }
  let i = Fl(t, n);
  return xf(i.duration, i.delay, i.easing);
}
function ur(e) {
  return (
    e ? ((e = w({}, e)), e.params && (e.params = mN(e.params))) : (e = {}), e
  );
}
function xf(e, n, t) {
  return { duration: e, delay: n, easing: t };
}
function rh(e, n, t, r, i, o, s = null, a = !1) {
  return {
    type: 1,
    element: e,
    keyframes: n,
    preStyleProps: t,
    postStyleProps: r,
    duration: i,
    delay: o,
    totalTime: i + o,
    easing: s,
    subTimeline: a,
  };
}
var Po = class {
    _map = new Map();
    get(n) {
      return this._map.get(n) || [];
    }
    append(n, t) {
      let r = this._map.get(n);
      r || this._map.set(n, (r = [])), r.push(...t);
    }
    has(n) {
      return this._map.has(n);
    }
    clear() {
      this._map.clear();
    }
  },
  DN = 1,
  _N = ":enter",
  EN = new RegExp(_N, "g"),
  wN = ":leave",
  CN = new RegExp(wN, "g");
function ZD(e, n, t, r, i, o = new Map(), s = new Map(), a, l, c = []) {
  return new $f().buildKeyframes(e, n, t, r, i, o, s, a, l, c);
}
var $f = class {
    buildKeyframes(n, t, r, i, o, s, a, l, c, u = []) {
      c = c || new Po();
      let d = new Hf(n, t, c, i, o, u, []);
      d.options = l;
      let h = l.delay ? dn(l.delay) : 0;
      d.currentTimeline.delayNextStep(h),
        d.currentTimeline.setStyles([s], null, d.errors, l),
        nt(this, r, d);
      let f = d.timelines.filter((m) => m.containsAnimation());
      if (f.length && a.size) {
        let m;
        for (let y = f.length - 1; y >= 0; y--) {
          let E = f[y];
          if (E.element === t) {
            m = E;
            break;
          }
        }
        m &&
          !m.allowOnlyTimelineStyles() &&
          m.setStyles([a], null, d.errors, l);
      }
      return f.length
        ? f.map((m) => m.buildKeyframes())
        : [rh(t, [], [], [], 0, h, "", !1)];
    }
    visitTrigger(n, t) {}
    visitState(n, t) {}
    visitTransition(n, t) {}
    visitAnimateChild(n, t) {
      let r = t.subInstructions.get(t.element);
      if (r) {
        let i = t.createSubContext(n.options),
          o = t.currentTimeline.currentTime,
          s = this._visitSubInstructions(r, i, i.options);
        o != s && t.transformIntoNewTimeline(s);
      }
      t.previousNode = n;
    }
    visitAnimateRef(n, t) {
      let r = t.createSubContext(n.options);
      r.transformIntoNewTimeline(),
        this._applyAnimationRefDelays([n.options, n.animation.options], t, r),
        this.visitReference(n.animation, r),
        t.transformIntoNewTimeline(r.currentTimeline.currentTime),
        (t.previousNode = n);
    }
    _applyAnimationRefDelays(n, t, r) {
      for (let i of n) {
        let o = i?.delay;
        if (o) {
          let s =
            typeof o == "number" ? o : dn(Ro(o, i?.params ?? {}, t.errors));
          r.delayNextStep(s);
        }
      }
    }
    _visitSubInstructions(n, t, r) {
      let o = t.currentTimeline.currentTime,
        s = r.duration != null ? dn(r.duration) : null,
        a = r.delay != null ? dn(r.delay) : null;
      return (
        s !== 0 &&
          n.forEach((l) => {
            let c = t.appendInstructionToTimeline(l, s, a);
            o = Math.max(o, c.duration + c.delay);
          }),
        o
      );
    }
    visitReference(n, t) {
      t.updateOptions(n.options, !0),
        nt(this, n.animation, t),
        (t.previousNode = n);
    }
    visitSequence(n, t) {
      let r = t.subContextCount,
        i = t,
        o = n.options;
      if (
        o &&
        (o.params || o.delay) &&
        ((i = t.createSubContext(o)),
        i.transformIntoNewTimeline(),
        o.delay != null)
      ) {
        i.previousNode.type == H.Style &&
          (i.currentTimeline.snapshotCurrentStyles(), (i.previousNode = Vl));
        let s = dn(o.delay);
        i.delayNextStep(s);
      }
      n.steps.length &&
        (n.steps.forEach((s) => nt(this, s, i)),
        i.currentTimeline.applyStylesToKeyframe(),
        i.subContextCount > r && i.transformIntoNewTimeline()),
        (t.previousNode = n);
    }
    visitGroup(n, t) {
      let r = [],
        i = t.currentTimeline.currentTime,
        o = n.options && n.options.delay ? dn(n.options.delay) : 0;
      n.steps.forEach((s) => {
        let a = t.createSubContext(n.options);
        o && a.delayNextStep(o),
          nt(this, s, a),
          (i = Math.max(i, a.currentTimeline.currentTime)),
          r.push(a.currentTimeline);
      }),
        r.forEach((s) => t.currentTimeline.mergeTimelineCollectedStyles(s)),
        t.transformIntoNewTimeline(i),
        (t.previousNode = n);
    }
    _visitTiming(n, t) {
      if (n.dynamic) {
        let r = n.strValue,
          i = t.params ? Ro(r, t.params, t.errors) : r;
        return Fl(i, t.errors);
      } else return { duration: n.duration, delay: n.delay, easing: n.easing };
    }
    visitAnimate(n, t) {
      let r = (t.currentAnimateTimings = this._visitTiming(n.timings, t)),
        i = t.currentTimeline;
      r.delay && (t.incrementTime(r.delay), i.snapshotCurrentStyles());
      let o = n.style;
      o.type == H.Keyframes
        ? this.visitKeyframes(o, t)
        : (t.incrementTime(r.duration),
          this.visitStyle(o, t),
          i.applyStylesToKeyframe()),
        (t.currentAnimateTimings = null),
        (t.previousNode = n);
    }
    visitStyle(n, t) {
      let r = t.currentTimeline,
        i = t.currentAnimateTimings;
      !i && r.hasCurrentStyleProperties() && r.forwardFrame();
      let o = (i && i.easing) || n.easing;
      n.isEmptyStep
        ? r.applyEmptyStep(o)
        : r.setStyles(n.styles, o, t.errors, t.options),
        (t.previousNode = n);
    }
    visitKeyframes(n, t) {
      let r = t.currentAnimateTimings,
        i = t.currentTimeline.duration,
        o = r.duration,
        a = t.createSubContext().currentTimeline;
      (a.easing = r.easing),
        n.styles.forEach((l) => {
          let c = l.offset || 0;
          a.forwardTime(c * o),
            a.setStyles(l.styles, l.easing, t.errors, t.options),
            a.applyStylesToKeyframe();
        }),
        t.currentTimeline.mergeTimelineCollectedStyles(a),
        t.transformIntoNewTimeline(i + o),
        (t.previousNode = n);
    }
    visitQuery(n, t) {
      let r = t.currentTimeline.currentTime,
        i = n.options || {},
        o = i.delay ? dn(i.delay) : 0;
      o &&
        (t.previousNode.type === H.Style ||
          (r == 0 && t.currentTimeline.hasCurrentStyleProperties())) &&
        (t.currentTimeline.snapshotCurrentStyles(), (t.previousNode = Vl));
      let s = r,
        a = t.invokeQuery(
          n.selector,
          n.originalSelector,
          n.limit,
          n.includeSelf,
          !!i.optional,
          t.errors
        );
      t.currentQueryTotal = a.length;
      let l = null;
      a.forEach((c, u) => {
        t.currentQueryIndex = u;
        let d = t.createSubContext(n.options, c);
        o && d.delayNextStep(o),
          c === t.element && (l = d.currentTimeline),
          nt(this, n.animation, d),
          d.currentTimeline.applyStylesToKeyframe();
        let h = d.currentTimeline.currentTime;
        s = Math.max(s, h);
      }),
        (t.currentQueryIndex = 0),
        (t.currentQueryTotal = 0),
        t.transformIntoNewTimeline(s),
        l &&
          (t.currentTimeline.mergeTimelineCollectedStyles(l),
          t.currentTimeline.snapshotCurrentStyles()),
        (t.previousNode = n);
    }
    visitStagger(n, t) {
      let r = t.parentContext,
        i = t.currentTimeline,
        o = n.timings,
        s = Math.abs(o.duration),
        a = s * (t.currentQueryTotal - 1),
        l = s * t.currentQueryIndex;
      switch (o.duration < 0 ? "reverse" : o.easing) {
        case "reverse":
          l = a - l;
          break;
        case "full":
          l = r.currentStaggerTime;
          break;
      }
      let u = t.currentTimeline;
      l && u.delayNextStep(l);
      let d = u.currentTime;
      nt(this, n.animation, t),
        (t.previousNode = n),
        (r.currentStaggerTime =
          i.currentTime - d + (i.startTime - r.currentTimeline.startTime));
    }
  },
  Vl = {},
  Hf = class e {
    _driver;
    element;
    subInstructions;
    _enterClassName;
    _leaveClassName;
    errors;
    timelines;
    parentContext = null;
    currentTimeline;
    currentAnimateTimings = null;
    previousNode = Vl;
    subContextCount = 0;
    options = {};
    currentQueryIndex = 0;
    currentQueryTotal = 0;
    currentStaggerTime = 0;
    constructor(n, t, r, i, o, s, a, l) {
      (this._driver = n),
        (this.element = t),
        (this.subInstructions = r),
        (this._enterClassName = i),
        (this._leaveClassName = o),
        (this.errors = s),
        (this.timelines = a),
        (this.currentTimeline = l || new jl(this._driver, t, 0)),
        a.push(this.currentTimeline);
    }
    get params() {
      return this.options.params;
    }
    updateOptions(n, t) {
      if (!n) return;
      let r = n,
        i = this.options;
      r.duration != null && (i.duration = dn(r.duration)),
        r.delay != null && (i.delay = dn(r.delay));
      let o = r.params;
      if (o) {
        let s = i.params;
        s || (s = this.options.params = {}),
          Object.keys(o).forEach((a) => {
            (!t || !s.hasOwnProperty(a)) && (s[a] = Ro(o[a], s, this.errors));
          });
      }
    }
    _copyOptions() {
      let n = {};
      if (this.options) {
        let t = this.options.params;
        if (t) {
          let r = (n.params = {});
          Object.keys(t).forEach((i) => {
            r[i] = t[i];
          });
        }
      }
      return n;
    }
    createSubContext(n = null, t, r) {
      let i = t || this.element,
        o = new e(
          this._driver,
          i,
          this.subInstructions,
          this._enterClassName,
          this._leaveClassName,
          this.errors,
          this.timelines,
          this.currentTimeline.fork(i, r || 0)
        );
      return (
        (o.previousNode = this.previousNode),
        (o.currentAnimateTimings = this.currentAnimateTimings),
        (o.options = this._copyOptions()),
        o.updateOptions(n),
        (o.currentQueryIndex = this.currentQueryIndex),
        (o.currentQueryTotal = this.currentQueryTotal),
        (o.parentContext = this),
        this.subContextCount++,
        o
      );
    }
    transformIntoNewTimeline(n) {
      return (
        (this.previousNode = Vl),
        (this.currentTimeline = this.currentTimeline.fork(this.element, n)),
        this.timelines.push(this.currentTimeline),
        this.currentTimeline
      );
    }
    appendInstructionToTimeline(n, t, r) {
      let i = {
          duration: t ?? n.duration,
          delay: this.currentTimeline.currentTime + (r ?? 0) + n.delay,
          easing: "",
        },
        o = new zf(
          this._driver,
          n.element,
          n.keyframes,
          n.preStyleProps,
          n.postStyleProps,
          i,
          n.stretchStartingKeyframe
        );
      return this.timelines.push(o), i;
    }
    incrementTime(n) {
      this.currentTimeline.forwardTime(this.currentTimeline.duration + n);
    }
    delayNextStep(n) {
      n > 0 && this.currentTimeline.delayNextStep(n);
    }
    invokeQuery(n, t, r, i, o, s) {
      let a = [];
      if ((i && a.push(this.element), n.length > 0)) {
        (n = n.replace(EN, "." + this._enterClassName)),
          (n = n.replace(CN, "." + this._leaveClassName));
        let l = r != 1,
          c = this._driver.query(this.element, n, l);
        r !== 0 &&
          (c = r < 0 ? c.slice(c.length + r, c.length) : c.slice(0, r)),
          a.push(...c);
      }
      return !o && a.length == 0 && s.push(LA(t)), a;
    }
  },
  jl = class e {
    _driver;
    element;
    startTime;
    _elementTimelineStylesLookup;
    duration = 0;
    easing = null;
    _previousKeyframe = new Map();
    _currentKeyframe = new Map();
    _keyframes = new Map();
    _styleSummary = new Map();
    _localTimelineStyles = new Map();
    _globalTimelineStyles;
    _pendingStyles = new Map();
    _backFill = new Map();
    _currentEmptyStepKeyframe = null;
    constructor(n, t, r, i) {
      (this._driver = n),
        (this.element = t),
        (this.startTime = r),
        (this._elementTimelineStylesLookup = i),
        this._elementTimelineStylesLookup ||
          (this._elementTimelineStylesLookup = new Map()),
        (this._globalTimelineStyles = this._elementTimelineStylesLookup.get(t)),
        this._globalTimelineStyles ||
          ((this._globalTimelineStyles = this._localTimelineStyles),
          this._elementTimelineStylesLookup.set(t, this._localTimelineStyles)),
        this._loadKeyframe();
    }
    containsAnimation() {
      switch (this._keyframes.size) {
        case 0:
          return !1;
        case 1:
          return this.hasCurrentStyleProperties();
        default:
          return !0;
      }
    }
    hasCurrentStyleProperties() {
      return this._currentKeyframe.size > 0;
    }
    get currentTime() {
      return this.startTime + this.duration;
    }
    delayNextStep(n) {
      let t = this._keyframes.size === 1 && this._pendingStyles.size;
      this.duration || t
        ? (this.forwardTime(this.currentTime + n),
          t && this.snapshotCurrentStyles())
        : (this.startTime += n);
    }
    fork(n, t) {
      return (
        this.applyStylesToKeyframe(),
        new e(
          this._driver,
          n,
          t || this.currentTime,
          this._elementTimelineStylesLookup
        )
      );
    }
    _loadKeyframe() {
      this._currentKeyframe && (this._previousKeyframe = this._currentKeyframe),
        (this._currentKeyframe = this._keyframes.get(this.duration)),
        this._currentKeyframe ||
          ((this._currentKeyframe = new Map()),
          this._keyframes.set(this.duration, this._currentKeyframe));
    }
    forwardFrame() {
      (this.duration += DN), this._loadKeyframe();
    }
    forwardTime(n) {
      this.applyStylesToKeyframe(), (this.duration = n), this._loadKeyframe();
    }
    _updateStyle(n, t) {
      this._localTimelineStyles.set(n, t),
        this._globalTimelineStyles.set(n, t),
        this._styleSummary.set(n, { time: this.currentTime, value: t });
    }
    allowOnlyTimelineStyles() {
      return this._currentEmptyStepKeyframe !== this._currentKeyframe;
    }
    applyEmptyStep(n) {
      n && this._previousKeyframe.set("easing", n);
      for (let [t, r] of this._globalTimelineStyles)
        this._backFill.set(t, r || Ut), this._currentKeyframe.set(t, Ut);
      this._currentEmptyStepKeyframe = this._currentKeyframe;
    }
    setStyles(n, t, r, i) {
      t && this._previousKeyframe.set("easing", t);
      let o = (i && i.params) || {},
        s = bN(n, this._globalTimelineStyles);
      for (let [a, l] of s) {
        let c = Ro(l, o, r);
        this._pendingStyles.set(a, c),
          this._localTimelineStyles.has(a) ||
            this._backFill.set(a, this._globalTimelineStyles.get(a) ?? Ut),
          this._updateStyle(a, c);
      }
    }
    applyStylesToKeyframe() {
      this._pendingStyles.size != 0 &&
        (this._pendingStyles.forEach((n, t) => {
          this._currentKeyframe.set(t, n);
        }),
        this._pendingStyles.clear(),
        this._localTimelineStyles.forEach((n, t) => {
          this._currentKeyframe.has(t) || this._currentKeyframe.set(t, n);
        }));
    }
    snapshotCurrentStyles() {
      for (let [n, t] of this._localTimelineStyles)
        this._pendingStyles.set(n, t), this._updateStyle(n, t);
    }
    getFinalKeyframe() {
      return this._keyframes.get(this.duration);
    }
    get properties() {
      let n = [];
      for (let t in this._currentKeyframe) n.push(t);
      return n;
    }
    mergeTimelineCollectedStyles(n) {
      n._styleSummary.forEach((t, r) => {
        let i = this._styleSummary.get(r);
        (!i || t.time > i.time) && this._updateStyle(r, t.value);
      });
    }
    buildKeyframes() {
      this.applyStylesToKeyframe();
      let n = new Set(),
        t = new Set(),
        r = this._keyframes.size === 1 && this.duration === 0,
        i = [];
      this._keyframes.forEach((a, l) => {
        let c = new Map([...this._backFill, ...a]);
        c.forEach((u, d) => {
          u === Tl ? n.add(d) : u === Ut && t.add(d);
        }),
          r || c.set("offset", l / this.duration),
          i.push(c);
      });
      let o = [...n.values()],
        s = [...t.values()];
      if (r) {
        let a = i[0],
          l = new Map(a);
        a.set("offset", 0), l.set("offset", 1), (i = [a, l]);
      }
      return rh(
        this.element,
        i,
        o,
        s,
        this.duration,
        this.startTime,
        this.easing,
        !1
      );
    }
  },
  zf = class extends jl {
    keyframes;
    preStyleProps;
    postStyleProps;
    _stretchStartingKeyframe;
    timings;
    constructor(n, t, r, i, o, s, a = !1) {
      super(n, t, s.delay),
        (this.keyframes = r),
        (this.preStyleProps = i),
        (this.postStyleProps = o),
        (this._stretchStartingKeyframe = a),
        (this.timings = {
          duration: s.duration,
          delay: s.delay,
          easing: s.easing,
        });
    }
    containsAnimation() {
      return this.keyframes.length > 1;
    }
    buildKeyframes() {
      let n = this.keyframes,
        { delay: t, duration: r, easing: i } = this.timings;
      if (this._stretchStartingKeyframe && t) {
        let o = [],
          s = r + t,
          a = t / s,
          l = new Map(n[0]);
        l.set("offset", 0), o.push(l);
        let c = new Map(n[0]);
        c.set("offset", PD(a)), o.push(c);
        let u = n.length - 1;
        for (let d = 1; d <= u; d++) {
          let h = new Map(n[d]),
            f = h.get("offset"),
            m = t + f * r;
          h.set("offset", PD(m / s)), o.push(h);
        }
        (r = s), (t = 0), (i = ""), (n = o);
      }
      return rh(
        this.element,
        n,
        this.preStyleProps,
        this.postStyleProps,
        r,
        t,
        i,
        !0
      );
    }
  };
function PD(e, n = 3) {
  let t = Math.pow(10, n - 1);
  return Math.round(e * t) / t;
}
function bN(e, n) {
  let t = new Map(),
    r;
  return (
    e.forEach((i) => {
      if (i === "*") {
        r ??= n.keys();
        for (let o of r) t.set(o, Ut);
      } else for (let [o, s] of i) t.set(o, s);
    }),
    t
  );
}
function OD(e, n, t, r, i, o, s, a, l, c, u, d, h) {
  return {
    type: 0,
    element: e,
    triggerName: n,
    isRemovalTransition: i,
    fromState: t,
    fromStyles: o,
    toState: r,
    toStyles: s,
    timelines: a,
    queriedElements: l,
    preStyleProps: c,
    postStyleProps: u,
    totalTime: d,
    errors: h,
  };
}
var Rf = {},
  Bl = class {
    _triggerName;
    ast;
    _stateStyles;
    constructor(n, t, r) {
      (this._triggerName = n), (this.ast = t), (this._stateStyles = r);
    }
    match(n, t, r, i) {
      return IN(this.ast.matchers, n, t, r, i);
    }
    buildStyles(n, t, r) {
      let i = this._stateStyles.get("*");
      return (
        n !== void 0 && (i = this._stateStyles.get(n?.toString()) || i),
        i ? i.buildStyles(t, r) : new Map()
      );
    }
    build(n, t, r, i, o, s, a, l, c, u) {
      let d = [],
        h = (this.ast.options && this.ast.options.params) || Rf,
        f = (a && a.params) || Rf,
        m = this.buildStyles(r, f, d),
        y = (l && l.params) || Rf,
        E = this.buildStyles(i, y, d),
        S = new Set(),
        O = new Map(),
        x = new Map(),
        U = i === "void",
        le = { params: KD(y, h), delay: this.ast.options?.delay },
        X = u ? [] : ZD(n, t, this.ast.animation, o, s, m, E, le, c, d),
        se = 0;
      return (
        X.forEach((we) => {
          se = Math.max(we.duration + we.delay, se);
        }),
        d.length
          ? OD(t, this._triggerName, r, i, U, m, E, [], [], O, x, se, d)
          : (X.forEach((we) => {
              let Ht = we.element,
                pr = rt(O, Ht, new Set());
              we.preStyleProps.forEach((Vn) => pr.add(Vn));
              let ih = rt(x, Ht, new Set());
              we.postStyleProps.forEach((Vn) => ih.add(Vn)),
                Ht !== t && S.add(Ht);
            }),
            OD(
              t,
              this._triggerName,
              r,
              i,
              U,
              m,
              E,
              X,
              [...S.values()],
              O,
              x,
              se
            ))
      );
    }
  };
function IN(e, n, t, r, i) {
  return e.some((o) => o(n, t, r, i));
}
function KD(e, n) {
  let t = w({}, n);
  return (
    Object.entries(e).forEach(([r, i]) => {
      i != null && (t[r] = i);
    }),
    t
  );
}
var Gf = class {
  styles;
  defaultParams;
  normalizer;
  constructor(n, t, r) {
    (this.styles = n), (this.defaultParams = t), (this.normalizer = r);
  }
  buildStyles(n, t) {
    let r = new Map(),
      i = KD(n, this.defaultParams);
    return (
      this.styles.styles.forEach((o) => {
        typeof o != "string" &&
          o.forEach((s, a) => {
            s && (s = Ro(s, i, t));
            let l = this.normalizer.normalizePropertyName(a, t);
            (s = this.normalizer.normalizeStyleValue(a, l, s, t)), r.set(a, s);
          });
      }),
      r
    );
  }
};
function SN(e, n, t) {
  return new qf(e, n, t);
}
var qf = class {
  name;
  ast;
  _normalizer;
  transitionFactories = [];
  fallbackTransition;
  states = new Map();
  constructor(n, t, r) {
    (this.name = n),
      (this.ast = t),
      (this._normalizer = r),
      t.states.forEach((i) => {
        let o = (i.options && i.options.params) || {};
        this.states.set(i.name, new Gf(i.style, o, r));
      }),
      FD(this.states, "true", "1"),
      FD(this.states, "false", "0"),
      t.transitions.forEach((i) => {
        this.transitionFactories.push(new Bl(n, i, this.states));
      }),
      (this.fallbackTransition = MN(n, this.states, this._normalizer));
  }
  get containsQueries() {
    return this.ast.queryCount > 0;
  }
  matchTransition(n, t, r, i) {
    return this.transitionFactories.find((s) => s.match(n, t, r, i)) || null;
  }
  matchStyles(n, t, r) {
    return this.fallbackTransition.buildStyles(n, t, r);
  }
};
function MN(e, n, t) {
  let r = [(s, a) => !0],
    i = { type: H.Sequence, steps: [], options: null },
    o = {
      type: H.Transition,
      animation: i,
      matchers: r,
      options: null,
      queryCount: 0,
      depCount: 0,
    };
  return new Bl(e, o, n);
}
function FD(e, n, t) {
  e.has(n) ? e.has(t) || e.set(t, e.get(n)) : e.has(t) && e.set(n, e.get(t));
}
var TN = new Po(),
  Wf = class {
    bodyNode;
    _driver;
    _normalizer;
    _animations = new Map();
    _playersById = new Map();
    players = [];
    constructor(n, t, r) {
      (this.bodyNode = n), (this._driver = t), (this._normalizer = r);
    }
    register(n, t) {
      let r = [],
        i = [],
        o = QD(this._driver, t, r, i);
      if (r.length) throw $A(r);
      i.length && void 0, this._animations.set(n, o);
    }
    _buildPlayer(n, t, r) {
      let i = n.element,
        o = UD(this._normalizer, n.keyframes, t, r);
      return this._driver.animate(i, o, n.duration, n.delay, n.easing, [], !0);
    }
    create(n, t, r = {}) {
      let i = [],
        o = this._animations.get(n),
        s,
        a = new Map();
      if (
        (o
          ? ((s = ZD(
              this._driver,
              t,
              o,
              GD,
              kf,
              new Map(),
              new Map(),
              r,
              TN,
              i
            )),
            s.forEach((u) => {
              let d = rt(a, u.element, new Map());
              u.postStyleProps.forEach((h) => d.set(h, null));
            }))
          : (i.push(HA()), (s = [])),
        i.length)
      )
        throw zA(i);
      a.forEach((u, d) => {
        u.forEach((h, f) => {
          u.set(f, this._driver.computeStyle(d, f, Ut));
        });
      });
      let l = s.map((u) => {
          let d = a.get(u.element);
          return this._buildPlayer(u, new Map(), d);
        }),
        c = Ln(l);
      return (
        this._playersById.set(n, c),
        c.onDestroy(() => this.destroy(n)),
        this.players.push(c),
        c
      );
    }
    destroy(n) {
      let t = this._getPlayer(n);
      t.destroy(), this._playersById.delete(n);
      let r = this.players.indexOf(t);
      r >= 0 && this.players.splice(r, 1);
    }
    _getPlayer(n) {
      let t = this._playersById.get(n);
      if (!t) throw GA(n);
      return t;
    }
    listen(n, t, r, i) {
      let o = Jf(t, "", "", "");
      return Yf(this._getPlayer(n), r, o, i), () => {};
    }
    command(n, t, r, i) {
      if (r == "register") {
        this.register(n, i[0]);
        return;
      }
      if (r == "create") {
        let s = i[0] || {};
        this.create(n, t, s);
        return;
      }
      let o = this._getPlayer(n);
      switch (r) {
        case "play":
          o.play();
          break;
        case "pause":
          o.pause();
          break;
        case "reset":
          o.reset();
          break;
        case "restart":
          o.restart();
          break;
        case "finish":
          o.finish();
          break;
        case "init":
          o.init();
          break;
        case "setPosition":
          o.setPosition(parseFloat(i[0]));
          break;
        case "destroy":
          this.destroy(n);
          break;
      }
    }
  },
  kD = "ng-animate-queued",
  AN = ".ng-animate-queued",
  Pf = "ng-animate-disabled",
  NN = ".ng-animate-disabled",
  xN = "ng-star-inserted",
  RN = ".ng-star-inserted",
  PN = [],
  YD = {
    namespaceId: "",
    setForRemoval: !1,
    setForMove: !1,
    hasAnimation: !1,
    removedBeforeQueried: !1,
  },
  ON = {
    namespaceId: "",
    setForMove: !1,
    setForRemoval: !1,
    hasAnimation: !1,
    removedBeforeQueried: !0,
  },
  bt = "__ng_removed",
  Oo = class {
    namespaceId;
    value;
    options;
    get params() {
      return this.options.params;
    }
    constructor(n, t = "") {
      this.namespaceId = t;
      let r = n && n.hasOwnProperty("value"),
        i = r ? n.value : n;
      if (((this.value = kN(i)), r)) {
        let o = n,
          { value: s } = o,
          a = Wl(o, ["value"]);
        this.options = a;
      } else this.options = {};
      this.options.params || (this.options.params = {});
    }
    absorbOptions(n) {
      let t = n.params;
      if (t) {
        let r = this.options.params;
        Object.keys(t).forEach((i) => {
          r[i] == null && (r[i] = t[i]);
        });
      }
    }
  },
  xo = "void",
  Of = new Oo(xo),
  Qf = class {
    id;
    hostElement;
    _engine;
    players = [];
    _triggers = new Map();
    _queue = [];
    _elementListeners = new Map();
    _hostClassName;
    constructor(n, t, r) {
      (this.id = n),
        (this.hostElement = t),
        (this._engine = r),
        (this._hostClassName = "ng-tns-" + n),
        ht(t, this._hostClassName);
    }
    listen(n, t, r, i) {
      if (!this._triggers.has(t)) throw qA(r, t);
      if (r == null || r.length == 0) throw WA(t);
      if (!LN(r)) throw QA(r, t);
      let o = rt(this._elementListeners, n, []),
        s = { name: t, phase: r, callback: i };
      o.push(s);
      let a = rt(this._engine.statesByElement, n, new Map());
      return (
        a.has(t) || (ht(n, Al), ht(n, Al + "-" + t), a.set(t, Of)),
        () => {
          this._engine.afterFlush(() => {
            let l = o.indexOf(s);
            l >= 0 && o.splice(l, 1), this._triggers.has(t) || a.delete(t);
          });
        }
      );
    }
    register(n, t) {
      return this._triggers.has(n) ? !1 : (this._triggers.set(n, t), !0);
    }
    _getTrigger(n) {
      let t = this._triggers.get(n);
      if (!t) throw ZA(n);
      return t;
    }
    trigger(n, t, r, i = !0) {
      let o = this._getTrigger(t),
        s = new Fo(this.id, t, n),
        a = this._engine.statesByElement.get(n);
      a ||
        (ht(n, Al),
        ht(n, Al + "-" + t),
        this._engine.statesByElement.set(n, (a = new Map())));
      let l = a.get(t),
        c = new Oo(r, this.id);
      if (
        (!(r && r.hasOwnProperty("value")) && l && c.absorbOptions(l.options),
        a.set(t, c),
        l || (l = Of),
        !(c.value === xo) && l.value === c.value)
      ) {
        if (!BN(l.params, c.params)) {
          let y = [],
            E = o.matchStyles(l.value, l.params, y),
            S = o.matchStyles(c.value, c.params, y);
          y.length
            ? this._engine.reportError(y)
            : this._engine.afterFlush(() => {
                dr(n, E), $t(n, S);
              });
        }
        return;
      }
      let h = rt(this._engine.playersByElement, n, []);
      h.forEach((y) => {
        y.namespaceId == this.id &&
          y.triggerName == t &&
          y.queued &&
          y.destroy();
      });
      let f = o.matchTransition(l.value, c.value, n, c.params),
        m = !1;
      if (!f) {
        if (!i) return;
        (f = o.fallbackTransition), (m = !0);
      }
      return (
        this._engine.totalQueuedPlayers++,
        this._queue.push({
          element: n,
          triggerName: t,
          transition: f,
          fromState: l,
          toState: c,
          player: s,
          isFallbackTransition: m,
        }),
        m ||
          (ht(n, kD),
          s.onStart(() => {
            yi(n, kD);
          })),
        s.onDone(() => {
          let y = this.players.indexOf(s);
          y >= 0 && this.players.splice(y, 1);
          let E = this._engine.playersByElement.get(n);
          if (E) {
            let S = E.indexOf(s);
            S >= 0 && E.splice(S, 1);
          }
        }),
        this.players.push(s),
        h.push(s),
        s
      );
    }
    deregister(n) {
      this._triggers.delete(n),
        this._engine.statesByElement.forEach((t) => t.delete(n)),
        this._elementListeners.forEach((t, r) => {
          this._elementListeners.set(
            r,
            t.filter((i) => i.name != n)
          );
        });
    }
    clearElementCache(n) {
      this._engine.statesByElement.delete(n), this._elementListeners.delete(n);
      let t = this._engine.playersByElement.get(n);
      t &&
        (t.forEach((r) => r.destroy()),
        this._engine.playersByElement.delete(n));
    }
    _signalRemovalForInnerTriggers(n, t) {
      let r = this._engine.driver.query(n, Ol, !0);
      r.forEach((i) => {
        if (i[bt]) return;
        let o = this._engine.fetchNamespacesByElement(i);
        o.size
          ? o.forEach((s) => s.triggerLeaveAnimation(i, t, !1, !0))
          : this.clearElementCache(i);
      }),
        this._engine.afterFlushAnimationsDone(() =>
          r.forEach((i) => this.clearElementCache(i))
        );
    }
    triggerLeaveAnimation(n, t, r, i) {
      let o = this._engine.statesByElement.get(n),
        s = new Map();
      if (o) {
        let a = [];
        if (
          (o.forEach((l, c) => {
            if ((s.set(c, l.value), this._triggers.has(c))) {
              let u = this.trigger(n, c, xo, i);
              u && a.push(u);
            }
          }),
          a.length)
        )
          return (
            this._engine.markElementAsRemoved(this.id, n, !0, t, s),
            r && Ln(a).onDone(() => this._engine.processLeaveNode(n)),
            !0
          );
      }
      return !1;
    }
    prepareLeaveAnimationListeners(n) {
      let t = this._elementListeners.get(n),
        r = this._engine.statesByElement.get(n);
      if (t && r) {
        let i = new Set();
        t.forEach((o) => {
          let s = o.name;
          if (i.has(s)) return;
          i.add(s);
          let l = this._triggers.get(s).fallbackTransition,
            c = r.get(s) || Of,
            u = new Oo(xo),
            d = new Fo(this.id, s, n);
          this._engine.totalQueuedPlayers++,
            this._queue.push({
              element: n,
              triggerName: s,
              transition: l,
              fromState: c,
              toState: u,
              player: d,
              isFallbackTransition: !0,
            });
        });
      }
    }
    removeNode(n, t) {
      let r = this._engine;
      if (
        (n.childElementCount && this._signalRemovalForInnerTriggers(n, t),
        this.triggerLeaveAnimation(n, t, !0))
      )
        return;
      let i = !1;
      if (r.totalAnimations) {
        let o = r.players.length ? r.playersByQueriedElement.get(n) : [];
        if (o && o.length) i = !0;
        else {
          let s = n;
          for (; (s = s.parentNode); )
            if (r.statesByElement.get(s)) {
              i = !0;
              break;
            }
        }
      }
      if ((this.prepareLeaveAnimationListeners(n), i))
        r.markElementAsRemoved(this.id, n, !1, t);
      else {
        let o = n[bt];
        (!o || o === YD) &&
          (r.afterFlush(() => this.clearElementCache(n)),
          r.destroyInnerAnimations(n),
          r._onRemovalComplete(n, t));
      }
    }
    insertNode(n, t) {
      ht(n, this._hostClassName);
    }
    drainQueuedTransitions(n) {
      let t = [];
      return (
        this._queue.forEach((r) => {
          let i = r.player;
          if (i.destroyed) return;
          let o = r.element,
            s = this._elementListeners.get(o);
          s &&
            s.forEach((a) => {
              if (a.name == r.triggerName) {
                let l = Jf(
                  o,
                  r.triggerName,
                  r.fromState.value,
                  r.toState.value
                );
                (l._data = n), Yf(r.player, a.phase, l, a.callback);
              }
            }),
            i.markedForDestroy
              ? this._engine.afterFlush(() => {
                  i.destroy();
                })
              : t.push(r);
        }),
        (this._queue = []),
        t.sort((r, i) => {
          let o = r.transition.ast.depCount,
            s = i.transition.ast.depCount;
          return o == 0 || s == 0
            ? o - s
            : this._engine.driver.containsElement(r.element, i.element)
            ? 1
            : -1;
        })
      );
    }
    destroy(n) {
      this.players.forEach((t) => t.destroy()),
        this._signalRemovalForInnerTriggers(this.hostElement, n);
    }
  },
  Zf = class {
    bodyNode;
    driver;
    _normalizer;
    players = [];
    newHostElements = new Map();
    playersByElement = new Map();
    playersByQueriedElement = new Map();
    statesByElement = new Map();
    disabledNodes = new Set();
    totalAnimations = 0;
    totalQueuedPlayers = 0;
    _namespaceLookup = {};
    _namespaceList = [];
    _flushFns = [];
    _whenQuietFns = [];
    namespacesByHostElement = new Map();
    collectedEnterElements = [];
    collectedLeaveElements = [];
    onRemovalComplete = (n, t) => {};
    _onRemovalComplete(n, t) {
      this.onRemovalComplete(n, t);
    }
    constructor(n, t, r) {
      (this.bodyNode = n), (this.driver = t), (this._normalizer = r);
    }
    get queuedPlayers() {
      let n = [];
      return (
        this._namespaceList.forEach((t) => {
          t.players.forEach((r) => {
            r.queued && n.push(r);
          });
        }),
        n
      );
    }
    createNamespace(n, t) {
      let r = new Qf(n, t, this);
      return (
        this.bodyNode && this.driver.containsElement(this.bodyNode, t)
          ? this._balanceNamespaceList(r, t)
          : (this.newHostElements.set(t, r), this.collectEnterElement(t)),
        (this._namespaceLookup[n] = r)
      );
    }
    _balanceNamespaceList(n, t) {
      let r = this._namespaceList,
        i = this.namespacesByHostElement;
      if (r.length - 1 >= 0) {
        let s = !1,
          a = this.driver.getParentElement(t);
        for (; a; ) {
          let l = i.get(a);
          if (l) {
            let c = r.indexOf(l);
            r.splice(c + 1, 0, n), (s = !0);
            break;
          }
          a = this.driver.getParentElement(a);
        }
        s || r.unshift(n);
      } else r.push(n);
      return i.set(t, n), n;
    }
    register(n, t) {
      let r = this._namespaceLookup[n];
      return r || (r = this.createNamespace(n, t)), r;
    }
    registerTrigger(n, t, r) {
      let i = this._namespaceLookup[n];
      i && i.register(t, r) && this.totalAnimations++;
    }
    destroy(n, t) {
      n &&
        (this.afterFlush(() => {}),
        this.afterFlushAnimationsDone(() => {
          let r = this._fetchNamespace(n);
          this.namespacesByHostElement.delete(r.hostElement);
          let i = this._namespaceList.indexOf(r);
          i >= 0 && this._namespaceList.splice(i, 1),
            r.destroy(t),
            delete this._namespaceLookup[n];
        }));
    }
    _fetchNamespace(n) {
      return this._namespaceLookup[n];
    }
    fetchNamespacesByElement(n) {
      let t = new Set(),
        r = this.statesByElement.get(n);
      if (r) {
        for (let i of r.values())
          if (i.namespaceId) {
            let o = this._fetchNamespace(i.namespaceId);
            o && t.add(o);
          }
      }
      return t;
    }
    trigger(n, t, r, i) {
      if (Rl(t)) {
        let o = this._fetchNamespace(n);
        if (o) return o.trigger(t, r, i), !0;
      }
      return !1;
    }
    insertNode(n, t, r, i) {
      if (!Rl(t)) return;
      let o = t[bt];
      if (o && o.setForRemoval) {
        (o.setForRemoval = !1), (o.setForMove = !0);
        let s = this.collectedLeaveElements.indexOf(t);
        s >= 0 && this.collectedLeaveElements.splice(s, 1);
      }
      if (n) {
        let s = this._fetchNamespace(n);
        s && s.insertNode(t, r);
      }
      i && this.collectEnterElement(t);
    }
    collectEnterElement(n) {
      this.collectedEnterElements.push(n);
    }
    markElementAsDisabled(n, t) {
      t
        ? this.disabledNodes.has(n) || (this.disabledNodes.add(n), ht(n, Pf))
        : this.disabledNodes.has(n) &&
          (this.disabledNodes.delete(n), yi(n, Pf));
    }
    removeNode(n, t, r) {
      if (Rl(t)) {
        let i = n ? this._fetchNamespace(n) : null;
        i ? i.removeNode(t, r) : this.markElementAsRemoved(n, t, !1, r);
        let o = this.namespacesByHostElement.get(t);
        o && o.id !== n && o.removeNode(t, r);
      } else this._onRemovalComplete(t, r);
    }
    markElementAsRemoved(n, t, r, i, o) {
      this.collectedLeaveElements.push(t),
        (t[bt] = {
          namespaceId: n,
          setForRemoval: i,
          hasAnimation: r,
          removedBeforeQueried: !1,
          previousTriggersValues: o,
        });
    }
    listen(n, t, r, i, o) {
      return Rl(t) ? this._fetchNamespace(n).listen(t, r, i, o) : () => {};
    }
    _buildInstruction(n, t, r, i, o) {
      return n.transition.build(
        this.driver,
        n.element,
        n.fromState.value,
        n.toState.value,
        r,
        i,
        n.fromState.options,
        n.toState.options,
        t,
        o
      );
    }
    destroyInnerAnimations(n) {
      let t = this.driver.query(n, Ol, !0);
      t.forEach((r) => this.destroyActiveAnimationsForElement(r)),
        this.playersByQueriedElement.size != 0 &&
          ((t = this.driver.query(n, Lf, !0)),
          t.forEach((r) => this.finishActiveQueriedAnimationOnElement(r)));
    }
    destroyActiveAnimationsForElement(n) {
      let t = this.playersByElement.get(n);
      t &&
        t.forEach((r) => {
          r.queued ? (r.markedForDestroy = !0) : r.destroy();
        });
    }
    finishActiveQueriedAnimationOnElement(n) {
      let t = this.playersByQueriedElement.get(n);
      t && t.forEach((r) => r.finish());
    }
    whenRenderingDone() {
      return new Promise((n) => {
        if (this.players.length) return Ln(this.players).onDone(() => n());
        n();
      });
    }
    processLeaveNode(n) {
      let t = n[bt];
      if (t && t.setForRemoval) {
        if (((n[bt] = YD), t.namespaceId)) {
          this.destroyInnerAnimations(n);
          let r = this._fetchNamespace(t.namespaceId);
          r && r.clearElementCache(n);
        }
        this._onRemovalComplete(n, t.setForRemoval);
      }
      n.classList?.contains(Pf) && this.markElementAsDisabled(n, !1),
        this.driver.query(n, NN, !0).forEach((r) => {
          this.markElementAsDisabled(r, !1);
        });
    }
    flush(n = -1) {
      let t = [];
      if (
        (this.newHostElements.size &&
          (this.newHostElements.forEach((r, i) =>
            this._balanceNamespaceList(r, i)
          ),
          this.newHostElements.clear()),
        this.totalAnimations && this.collectedEnterElements.length)
      )
        for (let r = 0; r < this.collectedEnterElements.length; r++) {
          let i = this.collectedEnterElements[r];
          ht(i, xN);
        }
      if (
        this._namespaceList.length &&
        (this.totalQueuedPlayers || this.collectedLeaveElements.length)
      ) {
        let r = [];
        try {
          t = this._flushAnimations(r, n);
        } finally {
          for (let i = 0; i < r.length; i++) r[i]();
        }
      } else
        for (let r = 0; r < this.collectedLeaveElements.length; r++) {
          let i = this.collectedLeaveElements[r];
          this.processLeaveNode(i);
        }
      if (
        ((this.totalQueuedPlayers = 0),
        (this.collectedEnterElements.length = 0),
        (this.collectedLeaveElements.length = 0),
        this._flushFns.forEach((r) => r()),
        (this._flushFns = []),
        this._whenQuietFns.length)
      ) {
        let r = this._whenQuietFns;
        (this._whenQuietFns = []),
          t.length
            ? Ln(t).onDone(() => {
                r.forEach((i) => i());
              })
            : r.forEach((i) => i());
      }
    }
    reportError(n) {
      throw KA(n);
    }
    _flushAnimations(n, t) {
      let r = new Po(),
        i = [],
        o = new Map(),
        s = [],
        a = new Map(),
        l = new Map(),
        c = new Map(),
        u = new Set();
      this.disabledNodes.forEach((T) => {
        u.add(T);
        let N = this.driver.query(T, AN, !0);
        for (let R = 0; R < N.length; R++) u.add(N[R]);
      });
      let d = this.bodyNode,
        h = Array.from(this.statesByElement.keys()),
        f = jD(h, this.collectedEnterElements),
        m = new Map(),
        y = 0;
      f.forEach((T, N) => {
        let R = GD + y++;
        m.set(N, R), T.forEach((K) => ht(K, R));
      });
      let E = [],
        S = new Set(),
        O = new Set();
      for (let T = 0; T < this.collectedLeaveElements.length; T++) {
        let N = this.collectedLeaveElements[T],
          R = N[bt];
        R &&
          R.setForRemoval &&
          (E.push(N),
          S.add(N),
          R.hasAnimation
            ? this.driver.query(N, RN, !0).forEach((K) => S.add(K))
            : O.add(N));
      }
      let x = new Map(),
        U = jD(h, Array.from(S));
      U.forEach((T, N) => {
        let R = kf + y++;
        x.set(N, R), T.forEach((K) => ht(K, R));
      }),
        n.push(() => {
          f.forEach((T, N) => {
            let R = m.get(N);
            T.forEach((K) => yi(K, R));
          }),
            U.forEach((T, N) => {
              let R = x.get(N);
              T.forEach((K) => yi(K, R));
            }),
            E.forEach((T) => {
              this.processLeaveNode(T);
            });
        });
      let le = [],
        X = [];
      for (let T = this._namespaceList.length - 1; T >= 0; T--)
        this._namespaceList[T].drainQueuedTransitions(t).forEach((R) => {
          let K = R.player,
            Ce = R.element;
          if ((le.push(K), this.collectedEnterElements.length)) {
            let Ne = Ce[bt];
            if (Ne && Ne.setForMove) {
              if (
                Ne.previousTriggersValues &&
                Ne.previousTriggersValues.has(R.triggerName)
              ) {
                let jn = Ne.previousTriggersValues.get(R.triggerName),
                  it = this.statesByElement.get(R.element);
                if (it && it.has(R.triggerName)) {
                  let ko = it.get(R.triggerName);
                  (ko.value = jn), it.set(R.triggerName, ko);
                }
              }
              K.destroy();
              return;
            }
          }
          let It = !d || !this.driver.containsElement(d, Ce),
            qe = x.get(Ce),
            fn = m.get(Ce),
            ue = this._buildInstruction(R, r, fn, qe, It);
          if (ue.errors && ue.errors.length) {
            X.push(ue);
            return;
          }
          if (It) {
            K.onStart(() => dr(Ce, ue.fromStyles)),
              K.onDestroy(() => $t(Ce, ue.toStyles)),
              i.push(K);
            return;
          }
          if (R.isFallbackTransition) {
            K.onStart(() => dr(Ce, ue.fromStyles)),
              K.onDestroy(() => $t(Ce, ue.toStyles)),
              i.push(K);
            return;
          }
          let ah = [];
          ue.timelines.forEach((Ne) => {
            (Ne.stretchStartingKeyframe = !0),
              this.disabledNodes.has(Ne.element) || ah.push(Ne);
          }),
            (ue.timelines = ah),
            r.append(Ce, ue.timelines);
          let i_ = { instruction: ue, player: K, element: Ce };
          s.push(i_),
            ue.queriedElements.forEach((Ne) => rt(a, Ne, []).push(K)),
            ue.preStyleProps.forEach((Ne, jn) => {
              if (Ne.size) {
                let it = l.get(jn);
                it || l.set(jn, (it = new Set())),
                  Ne.forEach((ko, ql) => it.add(ql));
              }
            }),
            ue.postStyleProps.forEach((Ne, jn) => {
              let it = c.get(jn);
              it || c.set(jn, (it = new Set())),
                Ne.forEach((ko, ql) => it.add(ql));
            });
        });
      if (X.length) {
        let T = [];
        X.forEach((N) => {
          T.push(YA(N.triggerName, N.errors));
        }),
          le.forEach((N) => N.destroy()),
          this.reportError(T);
      }
      let se = new Map(),
        we = new Map();
      s.forEach((T) => {
        let N = T.element;
        r.has(N) &&
          (we.set(N, N),
          this._beforeAnimationBuild(T.player.namespaceId, T.instruction, se));
      }),
        i.forEach((T) => {
          let N = T.element;
          this._getPreviousPlayers(
            N,
            !1,
            T.namespaceId,
            T.triggerName,
            null
          ).forEach((K) => {
            rt(se, N, []).push(K), K.destroy();
          });
        });
      let Ht = E.filter((T) => BD(T, l, c)),
        pr = new Map();
      VD(pr, this.driver, O, c, Ut).forEach((T) => {
        BD(T, l, c) && Ht.push(T);
      });
      let Vn = new Map();
      f.forEach((T, N) => {
        VD(Vn, this.driver, new Set(T), l, Tl);
      }),
        Ht.forEach((T) => {
          let N = pr.get(T),
            R = Vn.get(T);
          pr.set(
            T,
            new Map([...(N?.entries() ?? []), ...(R?.entries() ?? [])])
          );
        });
      let Gl = [],
        oh = [],
        sh = {};
      s.forEach((T) => {
        let { element: N, player: R, instruction: K } = T;
        if (r.has(N)) {
          if (u.has(N)) {
            R.onDestroy(() => $t(N, K.toStyles)),
              (R.disabled = !0),
              R.overrideTotalTime(K.totalTime),
              i.push(R);
            return;
          }
          let Ce = sh;
          if (we.size > 1) {
            let qe = N,
              fn = [];
            for (; (qe = qe.parentNode); ) {
              let ue = we.get(qe);
              if (ue) {
                Ce = ue;
                break;
              }
              fn.push(qe);
            }
            fn.forEach((ue) => we.set(ue, Ce));
          }
          let It = this._buildAnimation(R.namespaceId, K, se, o, Vn, pr);
          if ((R.setRealPlayer(It), Ce === sh)) Gl.push(R);
          else {
            let qe = this.playersByElement.get(Ce);
            qe && qe.length && (R.parentPlayer = Ln(qe)), i.push(R);
          }
        } else
          dr(N, K.fromStyles),
            R.onDestroy(() => $t(N, K.toStyles)),
            oh.push(R),
            u.has(N) && i.push(R);
      }),
        oh.forEach((T) => {
          let N = o.get(T.element);
          if (N && N.length) {
            let R = Ln(N);
            T.setRealPlayer(R);
          }
        }),
        i.forEach((T) => {
          T.parentPlayer ? T.syncPlayerEvents(T.parentPlayer) : T.destroy();
        });
      for (let T = 0; T < E.length; T++) {
        let N = E[T],
          R = N[bt];
        if ((yi(N, kf), R && R.hasAnimation)) continue;
        let K = [];
        if (a.size) {
          let It = a.get(N);
          It && It.length && K.push(...It);
          let qe = this.driver.query(N, Lf, !0);
          for (let fn = 0; fn < qe.length; fn++) {
            let ue = a.get(qe[fn]);
            ue && ue.length && K.push(...ue);
          }
        }
        let Ce = K.filter((It) => !It.destroyed);
        Ce.length ? VN(this, N, Ce) : this.processLeaveNode(N);
      }
      return (
        (E.length = 0),
        Gl.forEach((T) => {
          this.players.push(T),
            T.onDone(() => {
              T.destroy();
              let N = this.players.indexOf(T);
              this.players.splice(N, 1);
            }),
            T.play();
        }),
        Gl
      );
    }
    afterFlush(n) {
      this._flushFns.push(n);
    }
    afterFlushAnimationsDone(n) {
      this._whenQuietFns.push(n);
    }
    _getPreviousPlayers(n, t, r, i, o) {
      let s = [];
      if (t) {
        let a = this.playersByQueriedElement.get(n);
        a && (s = a);
      } else {
        let a = this.playersByElement.get(n);
        if (a) {
          let l = !o || o == xo;
          a.forEach((c) => {
            c.queued || (!l && c.triggerName != i) || s.push(c);
          });
        }
      }
      return (
        (r || i) &&
          (s = s.filter(
            (a) => !((r && r != a.namespaceId) || (i && i != a.triggerName))
          )),
        s
      );
    }
    _beforeAnimationBuild(n, t, r) {
      let i = t.triggerName,
        o = t.element,
        s = t.isRemovalTransition ? void 0 : n,
        a = t.isRemovalTransition ? void 0 : i;
      for (let l of t.timelines) {
        let c = l.element,
          u = c !== o,
          d = rt(r, c, []);
        this._getPreviousPlayers(c, u, s, a, t.toState).forEach((f) => {
          let m = f.getRealPlayer();
          m.beforeDestroy && m.beforeDestroy(), f.destroy(), d.push(f);
        });
      }
      dr(o, t.fromStyles);
    }
    _buildAnimation(n, t, r, i, o, s) {
      let a = t.triggerName,
        l = t.element,
        c = [],
        u = new Set(),
        d = new Set(),
        h = t.timelines.map((m) => {
          let y = m.element;
          u.add(y);
          let E = y[bt];
          if (E && E.removedBeforeQueried) return new kn(m.duration, m.delay);
          let S = y !== l,
            O = jN((r.get(y) || PN).map((se) => se.getRealPlayer())).filter(
              (se) => {
                let we = se;
                return we.element ? we.element === y : !1;
              }
            ),
            x = o.get(y),
            U = s.get(y),
            le = UD(this._normalizer, m.keyframes, x, U),
            X = this._buildPlayer(m, le, O);
          if ((m.subTimeline && i && d.add(y), S)) {
            let se = new Fo(n, a, y);
            se.setRealPlayer(X), c.push(se);
          }
          return X;
        });
      c.forEach((m) => {
        rt(this.playersByQueriedElement, m.element, []).push(m),
          m.onDone(() => FN(this.playersByQueriedElement, m.element, m));
      }),
        u.forEach((m) => ht(m, ND));
      let f = Ln(h);
      return (
        f.onDestroy(() => {
          u.forEach((m) => yi(m, ND)), $t(l, t.toStyles);
        }),
        d.forEach((m) => {
          rt(i, m, []).push(f);
        }),
        f
      );
    }
    _buildPlayer(n, t, r) {
      return t.length > 0
        ? this.driver.animate(n.element, t, n.duration, n.delay, n.easing, r)
        : new kn(n.duration, n.delay);
    }
  },
  Fo = class {
    namespaceId;
    triggerName;
    element;
    _player = new kn();
    _containsRealPlayer = !1;
    _queuedCallbacks = new Map();
    destroyed = !1;
    parentPlayer = null;
    markedForDestroy = !1;
    disabled = !1;
    queued = !0;
    totalTime = 0;
    constructor(n, t, r) {
      (this.namespaceId = n), (this.triggerName = t), (this.element = r);
    }
    setRealPlayer(n) {
      this._containsRealPlayer ||
        ((this._player = n),
        this._queuedCallbacks.forEach((t, r) => {
          t.forEach((i) => Yf(n, r, void 0, i));
        }),
        this._queuedCallbacks.clear(),
        (this._containsRealPlayer = !0),
        this.overrideTotalTime(n.totalTime),
        (this.queued = !1));
    }
    getRealPlayer() {
      return this._player;
    }
    overrideTotalTime(n) {
      this.totalTime = n;
    }
    syncPlayerEvents(n) {
      let t = this._player;
      t.triggerCallback && n.onStart(() => t.triggerCallback("start")),
        n.onDone(() => this.finish()),
        n.onDestroy(() => this.destroy());
    }
    _queueEvent(n, t) {
      rt(this._queuedCallbacks, n, []).push(t);
    }
    onDone(n) {
      this.queued && this._queueEvent("done", n), this._player.onDone(n);
    }
    onStart(n) {
      this.queued && this._queueEvent("start", n), this._player.onStart(n);
    }
    onDestroy(n) {
      this.queued && this._queueEvent("destroy", n), this._player.onDestroy(n);
    }
    init() {
      this._player.init();
    }
    hasStarted() {
      return this.queued ? !1 : this._player.hasStarted();
    }
    play() {
      !this.queued && this._player.play();
    }
    pause() {
      !this.queued && this._player.pause();
    }
    restart() {
      !this.queued && this._player.restart();
    }
    finish() {
      this._player.finish();
    }
    destroy() {
      (this.destroyed = !0), this._player.destroy();
    }
    reset() {
      !this.queued && this._player.reset();
    }
    setPosition(n) {
      this.queued || this._player.setPosition(n);
    }
    getPosition() {
      return this.queued ? 0 : this._player.getPosition();
    }
    triggerCallback(n) {
      let t = this._player;
      t.triggerCallback && t.triggerCallback(n);
    }
  };
function FN(e, n, t) {
  let r = e.get(n);
  if (r) {
    if (r.length) {
      let i = r.indexOf(t);
      r.splice(i, 1);
    }
    r.length == 0 && e.delete(n);
  }
  return r;
}
function kN(e) {
  return e ?? null;
}
function Rl(e) {
  return e && e.nodeType === 1;
}
function LN(e) {
  return e == "start" || e == "done";
}
function LD(e, n) {
  let t = e.style.display;
  return (e.style.display = n ?? "none"), t;
}
function VD(e, n, t, r, i) {
  let o = [];
  t.forEach((l) => o.push(LD(l)));
  let s = [];
  r.forEach((l, c) => {
    let u = new Map();
    l.forEach((d) => {
      let h = n.computeStyle(c, d, i);
      u.set(d, h), (!h || h.length == 0) && ((c[bt] = ON), s.push(c));
    }),
      e.set(c, u);
  });
  let a = 0;
  return t.forEach((l) => LD(l, o[a++])), s;
}
function jD(e, n) {
  let t = new Map();
  if ((e.forEach((a) => t.set(a, [])), n.length == 0)) return t;
  let r = 1,
    i = new Set(n),
    o = new Map();
  function s(a) {
    if (!a) return r;
    let l = o.get(a);
    if (l) return l;
    let c = a.parentNode;
    return t.has(c) ? (l = c) : i.has(c) ? (l = r) : (l = s(c)), o.set(a, l), l;
  }
  return (
    n.forEach((a) => {
      let l = s(a);
      l !== r && t.get(l).push(a);
    }),
    t
  );
}
function ht(e, n) {
  e.classList?.add(n);
}
function yi(e, n) {
  e.classList?.remove(n);
}
function VN(e, n, t) {
  Ln(t).onDone(() => e.processLeaveNode(n));
}
function jN(e) {
  let n = [];
  return JD(e, n), n;
}
function JD(e, n) {
  for (let t = 0; t < e.length; t++) {
    let r = e[t];
    r instanceof Ao ? JD(r.players, n) : n.push(r);
  }
}
function BN(e, n) {
  let t = Object.keys(e),
    r = Object.keys(n);
  if (t.length != r.length) return !1;
  for (let i = 0; i < t.length; i++) {
    let o = t[i];
    if (!n.hasOwnProperty(o) || e[o] !== n[o]) return !1;
  }
  return !0;
}
function BD(e, n, t) {
  let r = t.get(e);
  if (!r) return !1;
  let i = n.get(e);
  return i ? r.forEach((o) => i.add(o)) : n.set(e, r), t.delete(e), !0;
}
var vi = class {
  _driver;
  _normalizer;
  _transitionEngine;
  _timelineEngine;
  _triggerCache = {};
  onRemovalComplete = (n, t) => {};
  constructor(n, t, r) {
    (this._driver = t),
      (this._normalizer = r),
      (this._transitionEngine = new Zf(n.body, t, r)),
      (this._timelineEngine = new Wf(n.body, t, r)),
      (this._transitionEngine.onRemovalComplete = (i, o) =>
        this.onRemovalComplete(i, o));
  }
  registerTrigger(n, t, r, i, o) {
    let s = n + "-" + i,
      a = this._triggerCache[s];
    if (!a) {
      let l = [],
        c = [],
        u = QD(this._driver, o, l, c);
      if (l.length) throw BA(i, l);
      c.length && void 0,
        (a = SN(i, u, this._normalizer)),
        (this._triggerCache[s] = a);
    }
    this._transitionEngine.registerTrigger(t, i, a);
  }
  register(n, t) {
    this._transitionEngine.register(n, t);
  }
  destroy(n, t) {
    this._transitionEngine.destroy(n, t);
  }
  onInsert(n, t, r, i) {
    this._transitionEngine.insertNode(n, t, r, i);
  }
  onRemove(n, t, r) {
    this._transitionEngine.removeNode(n, t, r);
  }
  disableAnimations(n, t) {
    this._transitionEngine.markElementAsDisabled(n, t);
  }
  process(n, t, r, i) {
    if (r.charAt(0) == "@") {
      let [o, s] = TD(r),
        a = i;
      this._timelineEngine.command(o, t, s, a);
    } else this._transitionEngine.trigger(n, t, r, i);
  }
  listen(n, t, r, i, o) {
    if (r.charAt(0) == "@") {
      let [s, a] = TD(r);
      return this._timelineEngine.listen(s, t, a, o);
    }
    return this._transitionEngine.listen(n, t, r, i, o);
  }
  flush(n = -1) {
    this._transitionEngine.flush(n);
  }
  get players() {
    return [...this._transitionEngine.players, ...this._timelineEngine.players];
  }
  whenRenderingDone() {
    return this._transitionEngine.whenRenderingDone();
  }
  afterFlushAnimationsDone(n) {
    this._transitionEngine.afterFlushAnimationsDone(n);
  }
};
function UN(e, n) {
  let t = null,
    r = null;
  return (
    Array.isArray(n) && n.length
      ? ((t = Ff(n[0])), n.length > 1 && (r = Ff(n[n.length - 1])))
      : n instanceof Map && (t = Ff(n)),
    t || r ? new $N(e, t, r) : null
  );
}
var $N = (() => {
  class e {
    _element;
    _startStyles;
    _endStyles;
    static initialStylesByElement = new WeakMap();
    _state = 0;
    _initialStyles;
    constructor(t, r, i) {
      (this._element = t), (this._startStyles = r), (this._endStyles = i);
      let o = e.initialStylesByElement.get(t);
      o || e.initialStylesByElement.set(t, (o = new Map())),
        (this._initialStyles = o);
    }
    start() {
      this._state < 1 &&
        (this._startStyles &&
          $t(this._element, this._startStyles, this._initialStyles),
        (this._state = 1));
    }
    finish() {
      this.start(),
        this._state < 2 &&
          ($t(this._element, this._initialStyles),
          this._endStyles &&
            ($t(this._element, this._endStyles), (this._endStyles = null)),
          (this._state = 1));
    }
    destroy() {
      this.finish(),
        this._state < 3 &&
          (e.initialStylesByElement.delete(this._element),
          this._startStyles &&
            (dr(this._element, this._startStyles), (this._endStyles = null)),
          this._endStyles &&
            (dr(this._element, this._endStyles), (this._endStyles = null)),
          $t(this._element, this._initialStyles),
          (this._state = 3));
    }
  }
  return e;
})();
function Ff(e) {
  let n = null;
  return (
    e.forEach((t, r) => {
      HN(r) && ((n = n || new Map()), n.set(r, t));
    }),
    n
  );
}
function HN(e) {
  return e === "display" || e === "position";
}
var Ul = class {
    element;
    keyframes;
    options;
    _specialStyles;
    _onDoneFns = [];
    _onStartFns = [];
    _onDestroyFns = [];
    _duration;
    _delay;
    _initialized = !1;
    _finished = !1;
    _started = !1;
    _destroyed = !1;
    _finalKeyframe;
    _originalOnDoneFns = [];
    _originalOnStartFns = [];
    domPlayer;
    time = 0;
    parentPlayer = null;
    currentSnapshot = new Map();
    constructor(n, t, r, i) {
      (this.element = n),
        (this.keyframes = t),
        (this.options = r),
        (this._specialStyles = i),
        (this._duration = r.duration),
        (this._delay = r.delay || 0),
        (this.time = this._duration + this._delay);
    }
    _onFinish() {
      this._finished ||
        ((this._finished = !0),
        this._onDoneFns.forEach((n) => n()),
        (this._onDoneFns = []));
    }
    init() {
      this._buildPlayer(), this._preparePlayerBeforeStart();
    }
    _buildPlayer() {
      if (this._initialized) return;
      this._initialized = !0;
      let n = this.keyframes;
      (this.domPlayer = this._triggerWebAnimation(
        this.element,
        n,
        this.options
      )),
        (this._finalKeyframe = n.length ? n[n.length - 1] : new Map());
      let t = () => this._onFinish();
      this.domPlayer.addEventListener("finish", t),
        this.onDestroy(() => {
          this.domPlayer.removeEventListener("finish", t);
        });
    }
    _preparePlayerBeforeStart() {
      this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
    }
    _convertKeyframesToObject(n) {
      let t = [];
      return (
        n.forEach((r) => {
          t.push(Object.fromEntries(r));
        }),
        t
      );
    }
    _triggerWebAnimation(n, t, r) {
      return n.animate(this._convertKeyframesToObject(t), r);
    }
    onStart(n) {
      this._originalOnStartFns.push(n), this._onStartFns.push(n);
    }
    onDone(n) {
      this._originalOnDoneFns.push(n), this._onDoneFns.push(n);
    }
    onDestroy(n) {
      this._onDestroyFns.push(n);
    }
    play() {
      this._buildPlayer(),
        this.hasStarted() ||
          (this._onStartFns.forEach((n) => n()),
          (this._onStartFns = []),
          (this._started = !0),
          this._specialStyles && this._specialStyles.start()),
        this.domPlayer.play();
    }
    pause() {
      this.init(), this.domPlayer.pause();
    }
    finish() {
      this.init(),
        this._specialStyles && this._specialStyles.finish(),
        this._onFinish(),
        this.domPlayer.finish();
    }
    reset() {
      this._resetDomPlayerState(),
        (this._destroyed = !1),
        (this._finished = !1),
        (this._started = !1),
        (this._onStartFns = this._originalOnStartFns),
        (this._onDoneFns = this._originalOnDoneFns);
    }
    _resetDomPlayerState() {
      this.domPlayer && this.domPlayer.cancel();
    }
    restart() {
      this.reset(), this.play();
    }
    hasStarted() {
      return this._started;
    }
    destroy() {
      this._destroyed ||
        ((this._destroyed = !0),
        this._resetDomPlayerState(),
        this._onFinish(),
        this._specialStyles && this._specialStyles.destroy(),
        this._onDestroyFns.forEach((n) => n()),
        (this._onDestroyFns = []));
    }
    setPosition(n) {
      this.domPlayer === void 0 && this.init(),
        (this.domPlayer.currentTime = n * this.time);
    }
    getPosition() {
      return +(this.domPlayer.currentTime ?? 0) / this.time;
    }
    get totalTime() {
      return this._delay + this._duration;
    }
    beforeDestroy() {
      let n = new Map();
      this.hasStarted() &&
        this._finalKeyframe.forEach((r, i) => {
          i !== "offset" && n.set(i, this._finished ? r : nh(this.element, i));
        }),
        (this.currentSnapshot = n);
    }
    triggerCallback(n) {
      let t = n === "start" ? this._onStartFns : this._onDoneFns;
      t.forEach((r) => r()), (t.length = 0);
    }
  },
  $l = class {
    validateStyleProperty(n) {
      return !0;
    }
    validateAnimatableStyleProperty(n) {
      return !0;
    }
    containsElement(n, t) {
      return $D(n, t);
    }
    getParentElement(n) {
      return Xf(n);
    }
    query(n, t, r) {
      return HD(n, t, r);
    }
    computeStyle(n, t, r) {
      return nh(n, t);
    }
    animate(n, t, r, i, o, s = []) {
      let a = i == 0 ? "both" : "forwards",
        l = { duration: r, delay: i, fill: a };
      o && (l.easing = o);
      let c = new Map(),
        u = s.filter((f) => f instanceof Ul);
      lN(r, i) &&
        u.forEach((f) => {
          f.currentSnapshot.forEach((m, y) => c.set(y, m));
        });
      let d = oN(t).map((f) => new Map(f));
      d = cN(n, d, c);
      let h = UN(n, d);
      return new Ul(n, d, l, h);
    }
  };
var Pl = "@",
  XD = "@.disabled",
  Hl = class {
    namespaceId;
    delegate;
    engine;
    _onDestroy;
    ɵtype = 0;
    constructor(n, t, r, i) {
      (this.namespaceId = n),
        (this.delegate = t),
        (this.engine = r),
        (this._onDestroy = i);
    }
    get data() {
      return this.delegate.data;
    }
    destroyNode(n) {
      this.delegate.destroyNode?.(n);
    }
    destroy() {
      this.engine.destroy(this.namespaceId, this.delegate),
        this.engine.afterFlushAnimationsDone(() => {
          queueMicrotask(() => {
            this.delegate.destroy();
          });
        }),
        this._onDestroy?.();
    }
    createElement(n, t) {
      return this.delegate.createElement(n, t);
    }
    createComment(n) {
      return this.delegate.createComment(n);
    }
    createText(n) {
      return this.delegate.createText(n);
    }
    appendChild(n, t) {
      this.delegate.appendChild(n, t),
        this.engine.onInsert(this.namespaceId, t, n, !1);
    }
    insertBefore(n, t, r, i = !0) {
      this.delegate.insertBefore(n, t, r),
        this.engine.onInsert(this.namespaceId, t, n, i);
    }
    removeChild(n, t, r) {
      this.parentNode(t) &&
        this.engine.onRemove(this.namespaceId, t, this.delegate);
    }
    selectRootElement(n, t) {
      return this.delegate.selectRootElement(n, t);
    }
    parentNode(n) {
      return this.delegate.parentNode(n);
    }
    nextSibling(n) {
      return this.delegate.nextSibling(n);
    }
    setAttribute(n, t, r, i) {
      this.delegate.setAttribute(n, t, r, i);
    }
    removeAttribute(n, t, r) {
      this.delegate.removeAttribute(n, t, r);
    }
    addClass(n, t) {
      this.delegate.addClass(n, t);
    }
    removeClass(n, t) {
      this.delegate.removeClass(n, t);
    }
    setStyle(n, t, r, i) {
      this.delegate.setStyle(n, t, r, i);
    }
    removeStyle(n, t, r) {
      this.delegate.removeStyle(n, t, r);
    }
    setProperty(n, t, r) {
      t.charAt(0) == Pl && t == XD
        ? this.disableAnimations(n, !!r)
        : this.delegate.setProperty(n, t, r);
    }
    setValue(n, t) {
      this.delegate.setValue(n, t);
    }
    listen(n, t, r) {
      return this.delegate.listen(n, t, r);
    }
    disableAnimations(n, t) {
      this.engine.disableAnimations(n, t);
    }
  },
  Kf = class extends Hl {
    factory;
    constructor(n, t, r, i, o) {
      super(t, r, i, o), (this.factory = n), (this.namespaceId = t);
    }
    setProperty(n, t, r) {
      t.charAt(0) == Pl
        ? t.charAt(1) == "." && t == XD
          ? ((r = r === void 0 ? !0 : !!r), this.disableAnimations(n, r))
          : this.engine.process(this.namespaceId, n, t.slice(1), r)
        : this.delegate.setProperty(n, t, r);
    }
    listen(n, t, r) {
      if (t.charAt(0) == Pl) {
        let i = zN(n),
          o = t.slice(1),
          s = "";
        return (
          o.charAt(0) != Pl && ([o, s] = GN(o)),
          this.engine.listen(this.namespaceId, i, o, s, (a) => {
            let l = a._data || -1;
            this.factory.scheduleListenerCallback(l, r, a);
          })
        );
      }
      return this.delegate.listen(n, t, r);
    }
  };
function zN(e) {
  switch (e) {
    case "body":
      return document.body;
    case "document":
      return document;
    case "window":
      return window;
    default:
      return e;
  }
}
function GN(e) {
  let n = e.indexOf("."),
    t = e.substring(0, n),
    r = e.slice(n + 1);
  return [t, r];
}
var zl = class {
  delegate;
  engine;
  _zone;
  _currentId = 0;
  _microtaskId = 1;
  _animationCallbacksBuffer = [];
  _rendererCache = new Map();
  _cdRecurDepth = 0;
  constructor(n, t, r) {
    (this.delegate = n),
      (this.engine = t),
      (this._zone = r),
      (t.onRemovalComplete = (i, o) => {
        o?.removeChild(null, i);
      });
  }
  createRenderer(n, t) {
    let r = "",
      i = this.delegate.createRenderer(n, t);
    if (!n || !t?.data?.animation) {
      let c = this._rendererCache,
        u = c.get(i);
      if (!u) {
        let d = () => c.delete(i);
        (u = new Hl(r, i, this.engine, d)), c.set(i, u);
      }
      return u;
    }
    let o = t.id,
      s = t.id + "-" + this._currentId;
    this._currentId++, this.engine.register(s, n);
    let a = (c) => {
      Array.isArray(c)
        ? c.forEach(a)
        : this.engine.registerTrigger(o, s, n, c.name, c);
    };
    return t.data.animation.forEach(a), new Kf(this, s, i, this.engine);
  }
  begin() {
    this._cdRecurDepth++, this.delegate.begin && this.delegate.begin();
  }
  _scheduleCountTask() {
    queueMicrotask(() => {
      this._microtaskId++;
    });
  }
  scheduleListenerCallback(n, t, r) {
    if (n >= 0 && n < this._microtaskId) {
      this._zone.run(() => t(r));
      return;
    }
    let i = this._animationCallbacksBuffer;
    i.length == 0 &&
      queueMicrotask(() => {
        this._zone.run(() => {
          i.forEach((o) => {
            let [s, a] = o;
            s(a);
          }),
            (this._animationCallbacksBuffer = []);
        });
      }),
      i.push([t, r]);
  }
  end() {
    this._cdRecurDepth--,
      this._cdRecurDepth == 0 &&
        this._zone.runOutsideAngular(() => {
          this._scheduleCountTask(), this.engine.flush(this._microtaskId);
        }),
      this.delegate.end && this.delegate.end();
  }
  whenRenderingDone() {
    return this.engine.whenRenderingDone();
  }
};
var WN = (() => {
  class e extends vi {
    constructor(t, r, i) {
      super(t, r, i);
    }
    ngOnDestroy() {
      this.flush();
    }
    static ɵfac = function (r) {
      return new (r || e)(M(Me), M(fr), M(hr));
    };
    static ɵprov = b({ token: e, factory: e.ɵfac });
  }
  return e;
})();
function QN() {
  return new kl();
}
function ZN(e, n, t) {
  return new zl(e, n, t);
}
var t_ = [
    { provide: hr, useFactory: QN },
    { provide: vi, useClass: WN },
    { provide: bn, useFactory: ZN, deps: [Ga, vi, ee] },
  ],
  e_ = [
    { provide: fr, useFactory: () => new $l() },
    { provide: zu, useValue: "BrowserAnimations" },
    ...t_,
  ],
  KN = [
    { provide: fr, useClass: eh },
    { provide: zu, useValue: "NoopAnimations" },
    ...t_,
  ],
  n_ = (() => {
    class e {
      static withConfig(t) {
        return { ngModule: e, providers: t.disableAnimations ? KN : e_ };
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵmod = Se({ type: e });
      static ɵinj = Ie({ providers: e_, imports: [Wa] });
    }
    return e;
  })();
var r_ = (() => {
  class e {
    static {
      this.ɵfac = function (r) {
        return new (r || e)();
      };
    }
    static {
      this.ɵmod = Se({ type: e, bootstrap: [ID] });
    }
    static {
      this.ɵinj = Ie({ imports: [Wa, ED, uD, ky, n_] });
    }
  }
  return e;
})();
qy()
  .bootstrapModule(r_)
  .catch((e) => console.error(e));
